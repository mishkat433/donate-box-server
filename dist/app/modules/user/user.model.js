"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userEnums_1 = require("../../../enums/userEnums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: userEnums_1.USER_ROLE,
        required: true,
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
        // required: [true, "password is required"],
        default: null,
        select: 0,
        set: (v) => bcryptjs_1.default.hashSync(v, bcryptjs_1.default.genSaltSync(10))
    },
    division: {
        type: String,
        enum: userEnums_1.DIVISION_NAME,
        required: [true, "division name is required"],
    },
    address: {
        type: String,
        default: null
    },
    isBloodDonner: {
        type: Boolean,
        required: [true, "isBloodDonner is required"],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    profileImage: {
        type: String,
        default: null
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)('Users', userSchema);
