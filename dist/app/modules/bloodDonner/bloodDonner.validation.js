"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodDonnerZodValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../user/user.constants");
const crateBloodDonnerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber is required"
        }),
        division: zod_1.z.enum([...user_constants_1.userDivision], {
            required_error: 'user division is required',
        }),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {
            required_error: 'user division is required',
        }),
        address: zod_1.z.string({
            required_error: 'full Address is required',
        }),
        gender: zod_1.z.enum([...user_constants_1.gender], {
            required_error: 'gender is required',
        }),
    }),
});
exports.bloodDonnerZodValidation = {
    crateBloodDonnerZodSchema,
};
