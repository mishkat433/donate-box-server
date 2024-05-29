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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("./admin.model");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const admin_utils_1 = require("./admin.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtValidationHelpers_1 = require("../../../helpers/jwtValidationHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, admin_utils_1.generateAdminId)();
    payload.adminId = id;
    if (payload.role !== "admin") {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "This user role is not allowed");
    }
    const create = yield admin_model_1.Admin.create(payload);
    // if (!create) {
    //     throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to create Admin")
    // }
    // const result = await Admin.findOne({ adminId: create.adminId })
    return create;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield admin_model_1.Admin.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, password: 1, adminId: 1 }).lean();
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin doesn't exist with this phone number");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isAdminExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password in not correct");
    }
    const role = isAdminExist.role;
    const adminId = isAdminExist.adminId;
    const tokenData = { adminId, role };
    const accessToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '1d');
    const refreshToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.REFRESH_JWT_SECRET, '7d');
    return {
        accessToken,
        refreshToken
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtValidationHelpers_1.jwtValidation.verifyToken(token, config_1.default.REFRESH_JWT_SECRET);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    const { adminId, role } = verifyToken;
    const isAdminExist = admin_model_1.Admin.findOne({ $and: [{ adminId }, { role }] });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Admin doesn't exist with this phone number");
    }
    const tokenData = { adminId, role };
    const newAccessToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '1d');
    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')
    return {
        accessToken: newAccessToken,
    };
});
const getMyProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ userId: payload.userId }, { password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get a user");
    }
    return result;
});
const updateProfile = (payload, authorizedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOneAndUpdate({ adminId: authorizedData.adminId }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to update user");
    }
    return result;
});
exports.adminServices = {
    createAdmin,
    loginAdmin,
    refreshToken,
    getMyProfile,
    updateProfile
};
