import { z } from "zod";
import { bloodGroup, gender, userDivision } from "../user/user.constants";


const crateBloodDonnerZodSchema = z.object({
    body: z.object({
        fullName: z.string({
            required_error: "fullName is required"
        }),
        phoneNumber: z.string({
            required_error: "phoneNumber is required"
        }),
        division: z.enum([...userDivision] as [string, ...string[]], {
            required_error: 'user division is required',
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
            required_error: 'user division is required',
        }),
        address: z.string({
            required_error: 'full Address is required',
        }),
        gender: z.enum([...gender] as [string, ...string[]], {
            required_error: 'gender is required',
        }),
    }),
});


export const bloodDonnerZodValidation = {
    crateBloodDonnerZodSchema,
};
