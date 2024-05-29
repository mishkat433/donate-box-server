import { z } from "zod";
import { bloodGroup, gender, userDivision } from "../user/user.constants";
import { userRole } from "../../../constance/userRole";


const createAdminZodSchema = z.object({
    body: z.object({
        fullName: z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: z.string({
            required_error: "phoneNumber is required"
        }),
        role: z.enum([...userRole] as [string, ...string[]], {
            required_error: "role is required"
        }),
        secretKey: z.string({
            required_error: "SecretKey is required",
        }).min(5).max(5),
        password: z.string({
            required_error: "password is required"
        }),
        division: z.enum([...userDivision] as [string, ...string[]], {
            required_error: 'user division is required',
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
            required_error: 'user division is required',
        }).optional(),

        gender: z.enum([...gender] as [string, ...string[]], {}),

        address: z.string({}).optional(),
    }),
});

const updateAdminZodSchema = z.object({
    body: z.object({
        fullName: z.string({}).optional(),
        division: z.enum([...userDivision] as [string, ...string[]], {}).optional(),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {}).optional(),
        address: z.string({}).optional(),
        isBanned: z.boolean({}).optional(),
        gender: z.enum([...gender] as [string, ...string[]], {}).optional(),
        profileImage: z.string({}).optional(),
    }),
});

export const adminZodValidation = {
    createAdminZodSchema,
    updateAdminZodSchema
};
