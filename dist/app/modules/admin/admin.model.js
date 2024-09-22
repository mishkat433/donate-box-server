"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const userEnums_1 = require("../../../enums/userEnums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_interface_1 = require("./admin.interface");
const adminSchema = new mongoose_1.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: userEnums_1.USER_ROLE,
        required: true,
    },
    secretKey: {
        type: String,
        required: true,
        maxlength: [5, "invalid secret key"],
        minlength: [5, "invalid secret key"]
    },
    fullName: {
        type: "string",
        required: [true, "User name is required"],
        trim: true,
        maxlength: [32, 'User name must be at least 3-32 characters'],
        minlength: [3, 'User name must be at least 3-32 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, 'User password must be minimum 6 characters'],
        required: [true, "password is required"],
        select: 0,
        set: (v) => bcryptjs_1.default.hashSync(v, bcryptjs_1.default.genSaltSync(10))
    },
    division: {
        type: String,
        required: [true, "division name is required"],
    },
    district: {
        type: String,
        required: [true, "district name is required"],
    },
    area: {
        type: String,
        required: [true, "Area name is required"],
    },
    address: {
        type: String,
        default: null
    },
    bloodGroup: {
        type: String,
        enum: userEnums_1.BLOOD_GROUP_NAME,
        required: [true, "blood group is required "]
    },
    gender: {
        type: String,
        enum: userEnums_1.GENDER_TYPE,
        required: [true, "gender is required "]
    },
    profileImage: {
        type: String,
        default: null
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: admin_interface_1.REQUEST_TYPE,
        default: admin_interface_1.REQUEST_TYPE.PENDING
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admins', adminSchema);
