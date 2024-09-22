"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestForBloodZodValidation = void 0;
const zod_1 = require("zod");
const donateList_constance_1 = require("./donateList.constance");
const crateRequestZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        patientName: zod_1.z.string({
            required_error: "patientName is required"
        }),
        patientBG: zod_1.z.string({
            required_error: "patient BG is required"
        }),
        patientAge: zod_1.z.number({
            required_error: "patient age is required"
        }),
        patientType: zod_1.z.enum([...donateList_constance_1.patientType], {
            required_error: 'Patient type is required',
        }),
        requestFor: zod_1.z.enum([...donateList_constance_1.requestFor], {
            required_error: 'enter who is sick',
        }),
        medicalName: zod_1.z.string({
            required_error: 'medicalName is required',
        }),
        division: zod_1.z.string({
            required_error: 'division is required',
        }),
        district: zod_1.z.string({
            required_error: 'district is required',
        }),
        medicalAddress: zod_1.z.string({
            required_error: 'medicalAddress is required',
        }),
        dateOfNeedBlood: zod_1.z.string({
            required_error: 'dateOfNeedBlood is required',
        }),
        applicantName: zod_1.z.string({
            required_error: 'applicantName is required',
        }),
        applicantPhone: zod_1.z.string({
            required_error: 'applicantPhone is required',
        })
    }),
});
exports.requestForBloodZodValidation = {
    crateRequestZodSchema
};
