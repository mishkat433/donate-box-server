import { Schema, model } from "mongoose";
import { DIVISION_NAME, USER_ROLE } from "../../../enums/userEnums";
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
        enum: DIVISION_NAME,
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


export const User = model<IUser, UserModel>('Users', userSchema);