import { z } from "zod";
import { userRole } from "../../../constance/userRole";

const loginAdminZodValidation = z.object({
    body: z.object({

        phoneNumber: z.string({
            required_error: 'Contact number is required',

        }).trim().min(1, { message: "phone number is empty" }),

        role: z.enum([...userRole] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

        password: z.string({}).min(6, "password is too short").max(50, "password is too long"),
    }),
});


const refreshTokenZodValidation = z.object({
    cookies: z.object({
        refresh_token: z.string({
            required_error: 'refresh token is required',
        })

    }),
});


export const authValidation = {
    loginAdminZodValidation,
    refreshTokenZodValidation,
};