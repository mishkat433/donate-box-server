import { Schema, model } from "mongoose";
import { USER_ROLE } from "../../../enums/userEnums";
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from "./user.interface";


const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: USER_ROLE,
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
        set: (v: string) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
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
        required: [true, "Upazila/thana name is required"],
    },
    address: {
        type: String,
        default: null
    },
    isProfileVisible: {
        type: Boolean,
        default: true
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
    },
    verified: {
        type: Boolean,
        default: false
    },
    // dateOfNeedBlood: {
    //     type: String,
    //     default: null
    // },
    // nextDonateDate: {
    //     type: String,
    //     default: null
    // },
    firstBloodDonateDate: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});


export const User = model<IUser, UserModel>('Users', userSchema);