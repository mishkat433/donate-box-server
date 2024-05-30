import { Schema, model } from "mongoose";
import { DIVISION_NAME, USER_ROLE } from "../../../enums/userEnums";
import bcrypt from 'bcryptjs';
import { AdminModel, IAdmin } from "./admin.interface";


const adminSchema = new Schema<IAdmin>({
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: USER_ROLE,
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
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    });


export const Admin = model<IAdmin, AdminModel>('Admins', adminSchema);