import { Schema, model } from "mongoose";
import { fundDonateModal, IFundDonate } from "./fundDonner.interface";
import { REQUEST_TYPE } from "../admin/admin.interface";


const fundDonateSchema = new Schema<IFundDonate>({
    userId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: [true, "Name is missing"]
    },
    emailOrPhone: {
        type: String,
        required: [true, "Email/Phone number is missing"]
    },
    donateAmount: {
        type: Number,
        required: [true, "Amount is missing"]
    },
    donateInfo: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: REQUEST_TYPE,
        default: REQUEST_TYPE.PENDING,
    },
    publicShow: {
        type: Boolean,
        default: true,
    },


}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

export const FundDonner = model<IFundDonate, fundDonateModal>('FundDonner', fundDonateSchema);