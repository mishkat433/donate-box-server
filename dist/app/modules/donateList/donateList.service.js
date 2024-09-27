"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donateHistoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const donateList_constance_1 = require("./donateList.constance");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const donateList_model_1 = require("./donateList.model");
const globalEnums_1 = require("../../../enums/globalEnums");
const dateCount_1 = __importDefault(require("../../../helpers/dateCount"));
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const ifExistHelper_1 = __importDefault(require("../../../helpers/ifExistHelper"));
const createNeedDonateRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donateList_model_1.DonateHistory.create(payload);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Request creation failed");
    }
    return result;
});
const assignDonner = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(donateList_model_1.DonateHistory, { _id: id }, { nextDonateDate: 1 });
    if ((payload === null || payload === void 0 ? void 0 : payload.status) === globalEnums_1.REQUEST_TYPE.REJECT && !payload.rejectReason) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "You have must write a reject reason");
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.status) === globalEnums_1.REQUEST_TYPE.REJECT) {
        const result = yield donateList_model_1.DonateHistory.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, payload), { donnerId: null, nextDonateDate: null }), { new: true });
        return result;
    }
    // next donate date count start
    payload.nextDonateDate = yield (0, dateCount_1.default)(payload.dateOfNeedBlood, 3);
    // next donate date count end
    const result = yield donateList_model_1.DonateHistory.findOneAndUpdate({ _id: id }, payload, { new: true });
    const findUser = yield user_model_1.User.findOne({ userId: payload.donnerId }, { firstBloodDonateDate: 1 }).lean();
    if (findUser.firstBloodDonateDate === null) {
        yield user_model_1.User.findOneAndUpdate({ userId: payload.donnerId }, { firstBloodDonateDate: payload.dateOfNeedBlood, isBloodDonner: false }, { new: false, });
    }
    else {
        yield user_model_1.User.findOneAndUpdate({ userId: payload.donnerId }, { isBloodDonner: false }, { new: false, });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Donner assign failed");
    }
    return result;
});
const getAllRequest = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    andCondition.push({ status: { $ne: "PENDING" } });
    if (searchTerm) {
        andCondition.push({
            $or: donateList_constance_1.requestSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield donateList_model_1.DonateHistory.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield donateList_model_1.DonateHistory.aggregate([
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "admins",
                localField: "adminId",
                foreignField: "adminId",
                pipeline: [{
                        $project: {
                            role: 0,
                            secretKey: 0,
                            password: 0,
                            profileImage: 0,
                            gender: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            isBanned: 0,
                            status: 0,
                        }
                    }],
                as: "assigner_Data"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "donnerId",
                foreignField: "userId",
                pipeline: [{
                        $project: {
                            role: 0,
                            password: 0,
                            profileImage: 0,
                            isBanned: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            _id: 0
                        }
                    }],
                as: "donner_Data"
            }
        },
        { $unwind: { path: "$assigner_Data", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$donner_Data", preserveNullAndEmptyArrays: true } }
    ]).sort(sortConditions).match(whereCondition);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get request");
    }
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    };
});
const getPendingRequest = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    andCondition.push({ status: { $eq: "PENDING" } });
    if (searchTerm) {
        andCondition.push({
            $or: donateList_constance_1.requestSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield donateList_model_1.DonateHistory.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield donateList_model_1.DonateHistory.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get user");
    }
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    };
});
const myActivity = (filters, paginationOptions, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    andCondition.push({ donnerId: { $eq: id } });
    if (searchTerm) {
        andCondition.push({
            $or: donateList_constance_1.requestSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield donateList_model_1.DonateHistory.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield donateList_model_1.DonateHistory.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get user");
    }
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    };
});
const myRequest = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    if (!searchTerm) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Please enter you phone number");
    }
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: donateList_constance_1.myRequestSearchableField.map((field) => ({
                [field]: {
                    $in: searchTerm,
                    // $options: 'i'
                }
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield donateList_model_1.DonateHistory.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield donateList_model_1.DonateHistory.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get user");
    }
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    };
});
const deleteRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(donateList_model_1.DonateHistory, { _id: id }, {}, "Request");
    const result = yield donateList_model_1.DonateHistory.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Request delete failed");
    }
    return result;
});
exports.donateHistoryService = {
    createNeedDonateRequest,
    getAllRequest,
    getPendingRequest,
    assignDonner,
    myActivity,
    myRequest,
    deleteRequest
};
