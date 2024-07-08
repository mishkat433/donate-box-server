import { z } from "zod";
import { bloodGroup, gender } from "./user.constants";


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
        isBloodDonner: z.boolean({
            required_error: "I donate my blood now is required"
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
            required_error: 'user division is required',
        }).optional(),
        division: z.string({
            required_error: 'user division is required',
        }),
        district: z.string({
            required_error: 'district is required',
        }),
        area: z.string({
            required_error: 'thana/upazila is required',
        }),
        address: z.string({}).optional(),
    }),
});

const updateUserZodSchema = z.object({
    body: z.object({
        fullName: z.string({}).optional(),
        division: z.string({}).optional(),
        district: z.string({}).optional(),
        area: z.string({}).optional(),
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
