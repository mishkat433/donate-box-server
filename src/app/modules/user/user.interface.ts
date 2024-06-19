import { Model } from "mongoose";
import { BLOOD_GROUP_NAME, DIVISION_NAME, GENDER_TYPE, USER_ROLE } from "../../../enums/userEnums";


export type UserModel = Model<IUser, object>;


export type IUser = {
    userId: string;
    role: USER_ROLE;
    fullName: string;
    phoneNumber: string;
    password: string;
    division: DIVISION_NAME;
    isBloodDonner: boolean;
    bloodGroup?: BLOOD_GROUP_NAME;
    address?: string;
    isBanned: boolean;
    gender?: GENDER_TYPE;
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

export type IUserFilter = {
    searchTerm?: string;
    userId?: string;
    phoneNumber?: string;
    division?: DIVISION_NAME;
    gender?: GENDER_TYPE;
    bloodGroup?: BLOOD_GROUP_NAME;
    fullName?: string;
};

