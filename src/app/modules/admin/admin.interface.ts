import { Model } from "mongoose";
import { DIVISION_NAME, USER_ROLE } from "../../../enums/userEnums";


export type AdminModel = Model<IAdmin, object>;


export type IAdmin = {
    adminId: string;
    role: USER_ROLE;
    secretKey: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    bloodGroup: "A+" | "A-" | "B+" | "B-";
    address?: string;
    isBanned: boolean;
    division: DIVISION_NAME;
    gender: "Male" | "Female";
    profileImage?: string
}

export type IAdminFilter = {
    searchTerm?: string;
    adminId?: string;
    phoneNumber?: string;
    division?: DIVISION_NAME;
    gender?: 'male' | 'female';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    fullName?: string;
};

