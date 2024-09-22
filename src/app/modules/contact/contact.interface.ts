import { Model } from "mongoose";


export type contactModel = Model<IContact, object>;

export enum CONTACT_STATUS {
    PENDING = "PENDING",
    SOLVED = "SOLVED",
    ON_DISCUSSION = "ON_DISCUSSION",
}

export type IContact = {
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    resolverId: string;
    status: CONTACT_STATUS;
    resolverMessage: string;
}

export type IContactFiler = {
    searchTerm?: string;
    name?: string;
    phoneNumber?: string;
    email?: string;
    resolverId?: string;
    createdAt?: string;
    status?: CONTACT_STATUS;
};


