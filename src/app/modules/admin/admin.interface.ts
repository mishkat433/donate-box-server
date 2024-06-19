import { Model } from "mongoose";
import { BLOOD_GROUP_NAME, DIVISION_NAME, GENDER_TYPE, USER_ROLE } from "../../../enums/userEnums";



export type AdminModel = Model<IAdmin, object>;


export enum REQUEST_TYPE{
    PENDING="PENDING",
    ACCEPT="ACCEPT",
    REJECT="REJECT",
}

export type IAdmin = {
    adminId: string;
    role: USER_ROLE;
    secretKey: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    bloodGroup: BLOOD_GROUP_NAME;
    address?: string;
    isBanned: boolean;
    division: DIVISION_NAME;
    gender: GENDER_TYPE;
    profileImage?: string;
    status:REQUEST_TYPE;
}

export type IAdminFilter = {
    searchTerm?: string;
    adminId?: string;
    phoneNumber?: string;
    division?: DIVISION_NAME;
    gender?: GENDER_TYPE;
    bloodGroup?: BLOOD_GROUP_NAME;
    fullName?: string;
};

