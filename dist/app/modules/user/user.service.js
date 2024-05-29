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
const createUserHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = userEnums_1.USER_ROLE.USER;
    const genUId = yield (0, user_utils_1.generateUserId)();
    payload.userId = genUId;
    const createUser = yield user_model_1.User.create(payload);
    if (!createUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user creation failed");
    }
    return "User created successfully";
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
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(user_model_1.User, { userId: userId }, { userId: 1 });
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, payload, { new: true, });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user update failed");
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
exports.userService = {
    createUserHandler,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
