import { Schema, model } from "mongoose";
import { CONTACT_STATUS, contactModel, IContact } from "./contact.interface";


const contactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: [true, "Name is missing"]
    },
    email: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is missing"]
    },
    subject: {
        type: String,
        required: [true, "Subject is missing"]
    },
    message: {
        type: String,
        required: [true, "message is missing"]
    },
    resolverId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: CONTACT_STATUS,
        default: CONTACT_STATUS.PENDING,
    },
    resolverMessage: {
        type: String,
        default: null,
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

export const Contact = model<IContact, contactModel>('Contact', contactSchema);