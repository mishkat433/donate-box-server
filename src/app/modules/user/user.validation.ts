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
        }).min(6, 'password must be at least 6 to 15 characters').max(15, 'password is too long,  6 to 15 characters accepted'),
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

const updatePasswordZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: "phone number is required"
        }),
        password: z.string({
            required_error: "password is required"
        }).min(6, 'password must be at least 6 to 15 characters').max(15, 'password is too long,  6 to 15 characters accepted'),
    }),
});

const changePasswordZodSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: "password is required"
        }).min(6, 'password must be at least 6 to 15 characters').max(15, 'password is too long,  6 to 15 characters accepted'),
        oldPassword: z.string({
            required_error: "OldPassword is required"
        }).min(6, 'password must be at least 6 to 15 characters').max(15, 'password is too long,  6 to 15 characters accepted'),
    }),
});

export const userZodValidation = {
    crateUserZodSchema,
    updateUserZodSchema,
    updatePasswordZodSchema,
    changePasswordZodSchema,
};
