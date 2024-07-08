import { Schema, model } from "mongoose";
import { DONATE_TYPE, PATIENT_TYPE, RELATION_APPLICANT_TYPE } from "../../../enums/donateHistoryEnums";
import { BLOOD_GROUP_NAME } from "../../../enums/userEnums";
import { donateHistoryModel, IDonateHistory } from "./donateList.interface";
import { REQUEST_TYPE } from "../../../enums/globalEnums";



const donateHistorySchema = new Schema<IDonateHistory>({
    adminId: {
        type: String,
        default: null
    },
    donnerId: {
        type: String,
        default: null
    },
    patientName: {
        type: String,
        required: [true, "Patient Name is missing"]
    },
    patientBG: {
        type: String,
        enum: BLOOD_GROUP_NAME,
        required: [true, "Patient Age is missing"]
    },
    patientAge: {
        type: Number,
        maxlength: [3, "age is not acceptable"],
        required: [true, "Patient Age is missing"]
    },
    patientPhone: {
        type: String,
        default: null
    },
    emergencyPhone: {
        type: String,
        default: null
    },
    patientType: {
        type: String,
        enum: PATIENT_TYPE,
        required: [true, "Patient Type is missing"]
    },
    requestFor: {
        type: String,
        enum: RELATION_APPLICANT_TYPE,
        required: [true, "Missing applicant relation"]
    },
    medicalName: {
        type: String,
        required: [true, "Medical Name is missing"]
    },
    division: {
        type: String,
        required: [true, "Medical district is missing"]
    },
    district: {
        type: String,
        required: [true, "Medical division is missing"]
    },
    area: {
        type: String,
        default: null
    },
    medicalAddress: {
        type: String,
        required: [true, "Medical Address is missing"]
    },
    status: {
        type: String,
        enum: REQUEST_TYPE,
        default: REQUEST_TYPE.PENDING,
    },
    rejectReason: {
        type: String,
        default: null
    },
    dateOfNeedBlood: {
        type: String,
        required: [true, "Need blood date is missing"]
    },
    timeOfNeedBlood: {
        type: String,
        default: null
    },
    applicantName: {
        type: String,
        required: [true, "Applicant Name is missing"]
    },
    applicantPhone: {
        type: String,
        required: [true, "Applicant phone is missing"]
    },
    // donateType: {
    //     type: String,
    //     enum: DONATE_TYPE,
    //     required: [true, "Donate type is missing"]
    // },
    nextDonateDate: {
        type: String,
        default: null
    },
    force: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

export const DonateHistory = model<IDonateHistory, donateHistoryModel>('DonateHistories', donateHistorySchema);