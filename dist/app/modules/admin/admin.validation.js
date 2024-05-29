"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminZodValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../user/user.constants");
const userRole_1 = require("../../../constance/userRole");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber is required"
        }),
        role: zod_1.z.enum([...userRole_1.userRole], {
            required_error: "role is required"
        }),
        secretKey: zod_1.z.string({
            required_error: "SecretKey is required",
        }).min(5).max(5),
        password: zod_1.z.string({
            required_error: "password is required"
        }),
        division: zod_1.z.enum([...user_constants_1.userDivision], {
            required_error: 'user division is required',
        }),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {
            required_error: 'user division is required',
        }).optional(),
        gender: zod_1.z.enum([...user_constants_1.gender], {}),
        address: zod_1.z.string({}).optional(),
    }),
});
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({}).optional(),
        division: zod_1.z.enum([...user_constants_1.userDivision], {}).optional(),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {}).optional(),
        address: zod_1.z.string({}).optional(),
        isBanned: zod_1.z.boolean({}).optional(),
        gender: zod_1.z.enum([...user_constants_1.gender], {}).optional(),
        profileImage: zod_1.z.string({}).optional(),
    }),
});
exports.adminZodValidation = {
    createAdminZodSchema,
    updateAdminZodSchema
};
