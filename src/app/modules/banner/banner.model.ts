import { Schema, model } from "mongoose";
import { IBanner, bannerModel } from "./banner.interface";



const bannerSchema = new Schema<IBanner>({
    creatorId: {
        type: String,
        required: [true, "creatorId is missing"]
    },
    showing: {
        type: Boolean,
        default: true
    },
    path: {
        type: String,
        required: [true, "image path is required"]
    },
    description: {
        type: String,
        default: null
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

export const Banner = model<IBanner, bannerModel>('Banners', bannerSchema);