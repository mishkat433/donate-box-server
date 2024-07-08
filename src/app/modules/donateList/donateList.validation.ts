import { z } from "zod";
import { donateType, patientType, requestFor } from "./donateList.constance";


const crateRequestZodSchema = z.object({
    body: z.object({
        patientName: z.string({
            required_error: "patientName is required"
        }),
        patientBG: z.string({
            required_error: "patient BG is required"
        }),
        patientAge: z.number({
            required_error: "patient age is required"
        }),
        patientType: z.enum([...patientType] as [string, ...string[]], {
            required_error: 'Patient type is required',
        }),
        requestFor: z.enum([...requestFor] as [string, ...string[]], {
            required_error: 'enter who is sick',
        }),
        medicalName: z.string({
            required_error: 'medicalName is required',
        }),
        division: z.string({
            required_error: 'division is required',
        }),
        district: z.string({
            required_error: 'district is required',
        }),
        medicalAddress: z.string({
            required_error: 'medicalAddress is required',
        }),

        dateOfNeedBlood: z.string({
            required_error: 'dateOfNeedBlood is required',
        }),

        applicantName: z.string({
            required_error: 'applicantName is required',
        }),

        applicantPhone: z.string({
            required_error: 'applicantPhone is required',
        })
    }),
});


export const requestForBloodZodValidation = {
    crateRequestZodSchema
};
