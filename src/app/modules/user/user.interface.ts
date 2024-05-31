import { Model } from "mongoose";
import { DIVISION_NAME, USER_ROLE } from "../../../enums/userEnums";


export type UserModel = Model<IUser, object>;


export type IUser = {
    userId: string;
    role: USER_ROLE;
    fullName: string;
    phoneNumber: string;
    password: string;
    division: DIVISION_NAME;
    isBloodDonner: boolean;
    bloodGroup?: "A+" | "A-" | "B+" | "B-";
    address?: string;
    isBanned: boolean;
    gender?: "Male" | "Female";
    profileImage?: string
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
    gender?: 'male' | 'female';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    fullName?: string;
};

