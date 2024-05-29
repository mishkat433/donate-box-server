import { z } from "zod";
import { bloodGroup, gender, userDivision } from "./user.constants";


const crateUserZodSchema = z.object({
    body: z.object({
        fullName: z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: z.string({
            required_error: "phoneNumber is required"
        }),
        password: z.string({
            required_error: "password is required"
        }),
        division: z.enum([...userDivision] as [string, ...string[]], {
            required_error: 'user division is required',
        }),
        isBloodDonner: z.boolean({
            required_error: "I donate my blood now is required"
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
            required_error: 'user division is required',
        }).optional(),
        address: z.string({}).optional(),
    }),
});

const updateUserZodSchema = z.object({
    body: z.object({
        fullName: z.string({}).optional(),
        division: z.enum([...userDivision] as [string, ...string[]], {}).optional(),
        isBloodDonner: z.boolean({}).optional(),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {}).optional(),
        address: z.string({}).optional(),
        isBanned: z.boolean({}).optional(),
        gender: z.enum([...gender] as [string, ...string[]], {}).optional(),
        profileImage: z.string({}).optional(),
    }),
});

export const userZodValidation = {
    crateUserZodSchema,
    updateUserZodSchema
};
