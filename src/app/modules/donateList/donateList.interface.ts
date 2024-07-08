import { Model } from "mongoose";
import { DONATE_TYPE, PATIENT_TYPE, RELATION_APPLICANT_TYPE } from "../../../enums/donateHistoryEnums";
import { BLOOD_GROUP_NAME } from "../../../enums/userEnums";
import { REQUEST_TYPE } from "../../../enums/globalEnums";


export type donateHistoryModel = Model<IDonateHistory, object>;


export type IDonateHistory = {
    adminId: string;
    donnerId: string;
    patientName: string;
    patientBG: BLOOD_GROUP_NAME;
    patientAge: number;
    patientPhone?: string;
    emergencyPhone?: string;
    patientType: PATIENT_TYPE;
    medicalName: string;
    division: string;
    district: string;
    area?: string;
    medicalAddress: string;
    dateOfNeedBlood: string;
    timeOfNeedBlood: string;
    nextDonateDate: string;
    requestFor: RELATION_APPLICANT_TYPE;
    applicantName: string;
    applicantPhone: string;
    status: REQUEST_TYPE;
    rejectReason: string;
    // donateType: DONATE_TYPE;
    force: boolean;
}


export type IRequestFilter = {
    searchTerm?: string;
    donnerId?: string;
    patientPhone?: string;
    patientName?: string;
    applicantPhone?: string;
    donateType?: DONATE_TYPE;
    dateOfNeedBlood?: string;
    patientType?: PATIENT_TYPE;
    medicalName?: string;
    district?: string;
    division?: string;
    area?: string;
    createdAt?: string;
};


export type IUpdateRequest = {
    adminId: string;
    donnerId: string;
    status: REQUEST_TYPE;
    rejectReason?: string;
    nextDonateDate?: string;
    dateOfNeedBlood?: string | undefined
}


export type INeedBloodDate = {
    _id: string;
    dateOfNeedBlood: string
} | null