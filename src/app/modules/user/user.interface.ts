import { Model } from "mongoose";
import { BLOOD_GROUP_NAME, GENDER_TYPE, USER_ROLE } from "../../../enums/userEnums";


export type UserModel = Model<IUser, object>;


export type IUser = {
    userId: string;
    role: USER_ROLE;
    fullName: string;
    phoneNumber: string;
    password: string;
    division: string;
    district: string;
    area: string;
    isBloodDonner: boolean;
    bloodGroup?: BLOOD_GROUP_NAME;
    address?: string;
    isBanned: boolean;
    // dateOfNeedBlood: string | null;
    // nextDonateDate: string | null;
    firstBloodDonateDate: string;
    gender: GENDER_TYPE;
    profileImage?: string;
    verified: boolean;
}

export type IUserExist = {
    userId: string;
    phoneNumber: string;
    role: string;
}

export type IUserPasswordUpdate = {
    password: string;
    phoneNumber: string;
    role?: string;
}

export type IUserPasswordChange = {
    password: string;
    oldPassword: string;
    role?: string;
}

export type IUserFilter = {
    searchTerm?: string;
    userId?: string;
    phoneNumber?: string;
    division?: string;
    gender?: GENDER_TYPE;
    bloodGroup?: BLOOD_GROUP_NAME;
    fullName?: string;
};

