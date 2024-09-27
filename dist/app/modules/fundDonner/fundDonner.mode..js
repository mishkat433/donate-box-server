"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundDonner = void 0;
const mongoose_1 = require("mongoose");
const admin_interface_1 = require("../admin/admin.interface");
const fundDonateSchema = new mongoose_1.Schema({
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
        enum: admin_interface_1.REQUEST_TYPE,
        default: admin_interface_1.REQUEST_TYPE.PENDING,
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
exports.FundDonner = (0, mongoose_1.model)('FundDonner', fundDonateSchema);
