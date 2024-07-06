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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const userEnums_1 = require("../../../enums/userEnums");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const user_constants_1 = require("./user.constants");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ifExistHelper_1 = __importDefault(require("../../../helpers/ifExistHelper"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = require("../admin/admin.model");
const createUserHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.isBloodDonner && !(payload === null || payload === void 0 ? void 0 : payload.bloodGroup)) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Must be select blood group");
    }
    payload.password ? payload.role = userEnums_1.USER_ROLE.USER : payload.role = userEnums_1.USER_ROLE.DONNER;
    const genUId = yield (0, user_utils_1.generateUserId)();
    payload.userId = genUId;
    const createUser = yield user_model_1.User.create(payload);
    if (!createUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user creation failed");
    }
    if (payload.password) {
        return "User created successfully";
    }
    else {
        return "Donner created successfully";
    }
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            // isBanned: { $eq: false },
            $or: user_constants_1.userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            // isBanned: { $eq: false },
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield user_model_1.User.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield user_model_1.User.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit);
    if (!getAllUser) {
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
        data: getAllUser
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield user_model_1.User.find({ userId: id });
    if (!getUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "single user get failed");
    }
    return getUser;
});
const userExistHandler = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.find({ phoneNumber }).select({ phoneNumber: 1, userId: 1, role: 1 });
    if (!existUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Something went wrong, Donner not found");
    }
    return existUser;
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if ((payload === null || payload === void 0 ? void 0 : payload.isBloodDonner) && !(payload === null || payload === void 0 ? void 0 : payload.bloodGroup)) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Must be select blood group");
    }
    else
        ((payload === null || payload === void 0 ? true : delete payload.bloodGroup));
    yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId }, { userId: 1 });
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true, });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user update failed");
    }
    return result;
});
const passwordUpdateHandler = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId, phoneNumber: payload.phoneNumber }, { userId: 1 });
    let result;
    if (isExist.password && isExist.role === userEnums_1.USER_ROLE.USER) {
        const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isExist.password);
        if (isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old password and new password are the same");
        }
        result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true });
    }
    payload.role = userEnums_1.USER_ROLE.USER;
    result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "User password update failed");
    }
    return result;
});
const passwordChangeHandler = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist;
    if (userId.startsWith("Admin")) {
        isExist = yield (0, ifExistHelper_1.default)(admin_model_1.Admin, { adminId: userId }, { userId: 1 });
    }
    else {
        isExist = yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId }, { userId: 1 });
    }
    console.log(userId, isExist);
    let result;
    if (isExist.role === userEnums_1.USER_ROLE.USER) {
        const isPasswordMatch = yield bcryptjs_1.default.compare(payload.oldPassword, isExist.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old password is not correct");
        }
        else if (payload.oldPassword === payload.password) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old password and new password are the same");
        }
        result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true });
    }
    else {
        const isPasswordMatch = yield bcryptjs_1.default.compare(payload.oldPassword, isExist.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old password is not correct");
        }
        else if (payload.oldPassword === payload.password) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old password and new password are the same");
        }
        result = yield admin_model_1.Admin.findOneAndUpdate({ adminId: userId }, payload, { new: true });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "User password update failed");
    }
    return result;
});
const userBandHandle = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId }, { userId: 1 });
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "User banned failed");
    }
    return result;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId }, { userId: 1 });
    const result = yield user_model_1.User.deleteOne({ userId });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user delete failed");
    }
    return result;
});
const getAllDonner = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: user_constants_1.userSearchableFields.map((field) => ({
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
                [field]: value,
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield user_model_1.User.find(Object.assign(Object.assign({}, whereCondition), { isBloodDonner: true, isBanned: false })).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield user_model_1.User.find(Object.assign(Object.assign({}, whereCondition), { $and: [{ isBloodDonner: true }, { isBanned: false }] }), { password: 0, role: 0, isBanned: 0 }).sort(sortConditions).skip(skip).limit(limit);
    if (!getAllUser) {
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
        data: getAllUser
    };
});
exports.userService = {
    createUserHandler,
    getAllUsers,
    getSingleUser,
    userExistHandler,
    updateUser,
    deleteUser,
    getAllDonner,
    passwordUpdateHandler,
    userBandHandle,
    passwordChangeHandler,
};
