import { Model } from "mongoose";
import { REQUEST_TYPE } from "../admin/admin.interface";




export type fundDonateModal = Model<IFundDonate, object>;


export type IFundDonate = {
    userId: string;
    name: string;
    emailOrPhone: string;
    donateAmount: number;
    donateInfo?: any;
    status: REQUEST_TYPE;
    publicShow: boolean;
}