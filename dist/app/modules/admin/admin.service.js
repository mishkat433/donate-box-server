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
exports.adminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const userEnums_1 = require("../../../enums/userEnums");
const admin_model_1 = require("./admin.model");
const admin_utils_1 = require("./admin.utils");
const admin_constants_1 = require("./admin.constants");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ifExistHelper_1 = __importDefault(require("../../../helpers/ifExistHelper"));
const config_1 = __importDefault(require("../../../config"));
const createAdminHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.secretKey !== config_1.default.ADMIN_SECRET_KEY) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin secret is incorrect");
    }
    if (payload.role === userEnums_1.USER_ROLE.USER) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin role is not correct");
    }
    const genUId = yield (0, admin_utils_1.generateAdminId)();
    payload.adminId = genUId;
    const createUser = yield admin_model_1.Admin.create(payload);
    if (!createUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin creation failed");
    }
    return "Admin created successfully";
});
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: admin_constants_1.userSearchableFields.map((field) => ({
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
    const count = yield admin_model_1.Admin.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield admin_model_1.Admin.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit);
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
    const getUser = yield admin_model_1.Admin.find({ adminId: id });
    if (!getUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "single user get failed");
    }
    return getUser;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(admin_model_1.Admin, { adminId: id }, { adminId: 1 });
    const result = yield admin_model_1.Admin.findOneAndUpdate({ adminId: id }, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin update failed");
    }
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ifExistHelper_1.default)(admin_model_1.Admin, { adminId: id }, { adminId: 1 });
    const result = yield admin_model_1.Admin.deleteOne({ adminId: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user delete failed");
    }
    return result;
});
exports.adminService = {
    createAdminHandler,
    getAllAdmins,
    getSingleUser,
    updateUser,
    deleteUser
};
