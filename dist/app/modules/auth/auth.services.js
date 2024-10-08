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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtValidationHelpers_1 = require("../../../helpers/jwtValidationHelpers");
const user_model_1 = require("../user/user.model");
const userEnums_1 = require("../../../enums/userEnums");
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = require("../admin/admin.model");
const admin_interface_1 = require("../admin/admin.interface");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role !== "USER") {
        return loginAdmin(payload);
    }
    const isExist = yield user_model_1.User.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, fullName: 1, password: 1, userId: 1, isBanned: 1 }).lean();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist with this phone number");
    }
    if (isExist === null || isExist === void 0 ? void 0 : isExist.isBanned) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "You are Banned, Please contact authority");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "invalid password");
    }
    const role = isExist.role;
    const userId = isExist.userId;
    const fullName = isExist.fullName;
    const tokenData = { userId, role, fullName };
    const access_token = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '5m');
    const refresh_token = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.REFRESH_JWT_SECRET, '7d');
    return {
        access_token,
        refresh_token
    };
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, fullName: 1, password: 1, adminId: 1, status: 1, isBanned: 1 }).lean();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Admin doesn't exist with this phone number");
    }
    if (isExist === null || isExist === void 0 ? void 0 : isExist.isBanned) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "You are Banned, Please contact authority");
    }
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.status) !== admin_interface_1.REQUEST_TYPE.ACCEPT) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, `Your Admin Registration Request is ${isExist === null || isExist === void 0 ? void 0 : isExist.status}`);
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "invalid password");
    }
    const role = isExist.role;
    const adminId = isExist.adminId;
    const fullName = isExist.fullName;
    const tokenData = { adminId, role, fullName };
    const access_token = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '5m');
    const refresh_token = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.REFRESH_JWT_SECRET, '7d');
    return {
        access_token,
        refresh_token
    };
});
const handleLoginUserData = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "user id not found");
    }
    const checkUser = jwtValidationHelpers_1.jwtValidation.verifyToken(token, config_1.default.ACCESS_JWT_SECRET_KEY);
    if ((checkUser.role === userEnums_1.USER_ROLE.ADMIN && checkUser.adminId === id) || (checkUser.role === userEnums_1.USER_ROLE.SUPER_ADMIN && checkUser.adminId === id)) {
        const getAdmin = yield admin_model_1.Admin.find({ adminId: id }).select({ secret: 0 });
        if (!getAdmin) {
            throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "single user get failed");
        }
        if (getAdmin.isBanned) {
            throw new ApiError_1.default(http_status_1.default.UNAVAILABLE_FOR_LEGAL_REASONS, "You are Banned, Please contact authority");
        }
        return getAdmin;
    }
    else if (checkUser.role === userEnums_1.USER_ROLE.USER && checkUser.userId === id) {
        const getUser = yield user_model_1.User.find({ userId: id });
        if (!getUser) {
            throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "single user get failed");
        }
        if (getUser.isBanned) {
            throw new ApiError_1.default(http_status_1.default.UNAVAILABLE_FOR_LEGAL_REASONS, "You are Banned, Please contact authority");
        }
        return getUser;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "some thing went wrong");
    }
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtValidationHelpers_1.jwtValidation.verifyToken(token, config_1.default.REFRESH_JWT_SECRET);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    let userId = "";
    let role = verifyToken.role;
    let adminId = "";
    let isExist = null;
    if (verifyToken.role === userEnums_1.USER_ROLE.USER) {
        userId = verifyToken.userId;
        adminId = "";
    }
    else {
        adminId = verifyToken.adminId;
        userId = "";
    }
    userId.length > 1 ? isExist = user_model_1.User.findOne({ $and: [{ userId }, { role }] }) : isExist = admin_model_1.Admin.findOne({ $and: [{ adminId }, { role }] });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "cannot find user with your provided token");
    }
    let tokenData = {};
    if (adminId) {
        tokenData = { adminId, role };
    }
    else {
        tokenData = { userId, role };
    }
    const newAccessToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '5m');
    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')
    return {
        access_token: newAccessToken,
    };
});
exports.authServices = {
    loginUser,
    loginAdmin,
    refreshToken,
    handleLoginUserData
};
