"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateHistory = void 0;
const mongoose_1 = require("mongoose");
const donateHistoryEnums_1 = require("../../../enums/donateHistoryEnums");
const userEnums_1 = require("../../../enums/userEnums");
const globalEnums_1 = require("../../../enums/globalEnums");
const donateHistorySchema = new mongoose_1.Schema({
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
        enum: userEnums_1.BLOOD_GROUP_NAME,
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
        enum: donateHistoryEnums_1.PATIENT_TYPE,
        required: [true, "Patient Type is missing"]
    },
    requestFor: {
        type: String,
        enum: donateHistoryEnums_1.RELATION_APPLICANT_TYPE,
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
        enum: globalEnums_1.REQUEST_TYPE,
        default: globalEnums_1.REQUEST_TYPE.PENDING,
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
exports.DonateHistory = (0, mongoose_1.model)('DonateHistories', donateHistorySchema);
