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
    userId: { type: "string" },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        maxlength: [11, 'Phone Number is not valid'],
        minlength: [11, 'Phone Number is not valid']
    },
    role: {
        type: String,
        enum: userEnums_1.USER_ROLE,
        required: true,
    },
    password: {
        type: String,
        select: false,
        minlength: [6, 'User password must be minimum 6 characters'],
        // validate: {
        //     validator: function (pass: string): boolean {
        //         return /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/.test(pass)
        //     },
        //     message: 'Password must be capital letter, small letter and number'
        // },
        required: [true, "password is required"],
        set: (v) => bcryptjs_1.default.hashSync(v, bcryptjs_1.default.genSaltSync(10))
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
            },
        },
        required: [true, "User name is required"],
        trim: true,
        maxlength: [32, 'User name must be at least 3-32 characters'],
        minlength: [3, 'User name must be at least 3-32 characters']
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)('user', userSchema);
