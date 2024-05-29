"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const userRole_1 = require("../../../constance/userRole");
const loginAdminZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Contact number is required',
        }).trim().min(1, { message: "phone number is empty" }),
        role: zod_1.z.enum([...userRole_1.userRole], {
            required_error: 'user role is required',
        }),
        password: zod_1.z.string({}).min(6, "password is too short").max(50, "password is too long"),
    }),
});
const refreshTokenZodValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refresh_token: zod_1.z.string({
            required_error: 'refresh token is required',
        })
    }),
});
exports.authValidation = {
    loginAdminZodValidation,
    refreshTokenZodValidation,
};
