"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidation = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../Errors/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJsonWebToken = (payload, secretKey, expiresIn) => {
    if (typeof payload !== 'object' || !payload) {
        throw new ApiError_1.default(http_status_1.default.OK, "Payload must be an non empty object");
    }
    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new ApiError_1.default(http_status_1.default.OK, "secretKey must be an non empty string");
    }
    try {
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
        return token;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.OK, "jwt token is not created");
    }
};
const verifyToken = (token, secret) => {
    console.log(secret);
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtValidation = { createJsonWebToken, verifyToken };
