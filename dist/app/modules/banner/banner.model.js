"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
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
exports.Banner = (0, mongoose_1.model)('Banners', bannerSchema);
