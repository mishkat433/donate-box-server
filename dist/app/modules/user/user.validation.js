"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const crateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber is required"
        }),
        password: zod_1.z.string({
            required_error: "password is required"
        }),
        division: zod_1.z.enum([...user_constants_1.userDivision], {
            required_error: 'user division is required',
        }),
        isBloodDonner: zod_1.z.boolean({
            required_error: "I donate my blood now is required"
        }),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {
            required_error: 'user division is required',
        }).optional(),
        address: zod_1.z.string({}).optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({}).optional(),
        division: zod_1.z.enum([...user_constants_1.userDivision], {}).optional(),
        isBloodDonner: zod_1.z.boolean({}).optional(),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {}).optional(),
        address: zod_1.z.string({}).optional(),
        isBanned: zod_1.z.boolean({}).optional(),
        gender: zod_1.z.enum([...user_constants_1.gender], {}).optional(),
        profileImage: zod_1.z.string({}).optional(),
    }),
});
exports.userZodValidation = {
    crateUserZodSchema,
    updateUserZodSchema
};
