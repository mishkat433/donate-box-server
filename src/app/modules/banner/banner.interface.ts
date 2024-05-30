import { Model } from "mongoose";


export type bannerModel = Model<IBanner, object>;



export type IBanner = {
    creatorId: string;
    showing: boolean;
    path: string;
    description?: string;
}



