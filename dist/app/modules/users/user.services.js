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
exports.userServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_mode_1 = require("./user.mode");
const user_constants_1 = require("./user.constants");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utils_1 = require("./user.utils");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, user_utils_1.generateUserId)();
    userData.userId = id;
    if (userData.role === "buyer") {
        userData.income = 0;
    }
    // if (userData.role === "seller") {
    //     userData.budget = 0
    // }
    const result = yield user_mode_1.User.create(userData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to create user");
    }
    return result;
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
                [field]: value
            }))
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield user_mode_1.User.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield user_mode_1.User.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit);
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
    const result = yield user_mode_1.User.findOne({ userId: id }, { password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get a user");
    }
    return result;
});
const getMyProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_mode_1.User.findOne({ userId: payload.userId }, { password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get a user");
    }
    return result;
});
const updateUser = (payload, authorizedData, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (authorizedData.userId !== id) {
        throw new ApiError_1.default(http_status_1.default.NOT_EXTENDED, "This userId is not authorized");
    }
    const result = yield user_mode_1.User.findOneAndUpdate({ userId: authorizedData.userId }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to update user");
    }
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield user_mode_1.User.findOneAndDelete({ userId: id, role: { $ne: 'admin' } });
    if (!deleteUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Something went wrong, user cannot be deleted");
    }
    return deleteUser;
});
exports.userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile
};
