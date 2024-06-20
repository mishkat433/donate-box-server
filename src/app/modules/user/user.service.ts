import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { USER_ROLE } from "../../../enums/userEnums";
import { IUser, IUserExist, IUserFilter, IUserPasswordChange, IUserPasswordUpdate } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { userSearchableFields } from "./user.constants";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from 'mongoose';
import { IGenericResponse } from "../../../globalInterfaces/common";
import checkExist from "../../../helpers/ifExistHelper";
import bcrypt from 'bcryptjs';
import { Admin } from "../admin/admin.model";


const createUserHandler = async (payload: IUser): Promise<string> => {

    if (payload.isBloodDonner && !payload?.bloodGroup) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Must be select blood group")
    }


    payload.password ? payload.role = USER_ROLE.USER : payload.role = USER_ROLE.DONNER

    const genUId = await generateUserId()
    payload.userId = genUId


    const createUser = await User.create(payload);

    if (!createUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user creation failed")
    }

    if (payload.password) {
        return "User created successfully"
    }
    else {
        return "Donner created successfully"
    }


}

const getAllUsers = async (filters: IUserFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IUser[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            // isBanned: { $eq: false },
            $or: userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length) {
        andCondition.push({
            // isBanned: { $eq: false },
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const count = await User.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await User.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit)

    if (!getAllUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get user")
    }

    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    }

}

const getSingleUser = async (id: string) => {

    const getUser = await User.find({ userId: id });

    if (!getUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
    }

    return getUser
}

const userExistHandler = async (phoneNumber: string): Promise<IUserExist[]> => {


    const existUser = await User.find({ phoneNumber }).select({ phoneNumber: 1, userId: 1, role: 1 });

    if (!existUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong, Donner not found")
    }

    return existUser
}

const updateUser = async (userId: string, payload: IUser) => {

    if (payload?.isBloodDonner && !payload?.bloodGroup) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Must be select blood group")
    }
    else (
        delete (payload?.bloodGroup)
    )

    await checkExist(User, { userId: userId }, { userId: 1 })

    const result = await User.findOneAndUpdate({ userId }, payload, { new: true, });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user update failed")
    }

    return result
}

const passwordUpdateHandler = async (userId: string, payload: IUserPasswordUpdate) => {

    const isExist = await checkExist(User, { userId: userId, phoneNumber: payload.phoneNumber }, { userId: 1 })

    let result

    if (isExist.password && isExist.role === USER_ROLE.USER) {
        const isPasswordMatch = await bcrypt.compare(payload.password, isExist.password);
        if (isPasswordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Old password and new password are the same");
        }

        result = await User.findOneAndUpdate({ userId }, payload, { new: true });
    }

    payload.role = USER_ROLE.USER

    result = await User.findOneAndUpdate({ userId }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "User password update failed")
    }

    return result
}

const passwordChangeHandler = async (userId: string, payload: IUserPasswordChange) => {

    let isExist;

    if (userId.startsWith("Admin")) {
        isExist = await checkExist(Admin, { adminId: userId }, { userId: 1 })
    }
    else {
        isExist = await checkExist(User, { userId: userId }, { userId: 1 })
    }
    console.log(userId, isExist);
    let result

    if (isExist.role === USER_ROLE.USER) {
        const isPasswordMatch = await bcrypt.compare(payload.oldPassword, isExist.password);
        if (!isPasswordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Old password is not correct");
        }
        else if(payload.oldPassword === payload.password) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Old password and new password are the same");
        }

        result = await User.findOneAndUpdate({ userId }, payload, { new: true });
    }
    else {
        const isPasswordMatch = await bcrypt.compare(payload.oldPassword, isExist.password);
        if (!isPasswordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Old password is not correct");
        }
        else if(payload.oldPassword === payload.password) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Old password and new password are the same");
        }

        result = await Admin.findOneAndUpdate({ adminId: userId }, payload, { new: true });
    }

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "User password update failed")
    }

    return result
}


const userBandHandle = async (userId: string, payload: { isBanned: boolean }) => {

    await checkExist(User, { userId: userId }, { userId: 1 })

    const result = await User.findOneAndUpdate({ userId }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "User banned failed")
    }

    return result
}

const deleteUser = async (userId: string) => {

    await checkExist(User, { userId: userId }, { userId: 1 })

    const result = await User.deleteOne({ userId });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user delete failed")
    }

    return result
}

const getAllDonner = async (filters: IUserFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IUser[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            }))
        })
    }

    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const count = await User.find({ ...whereCondition, isBloodDonner: true, isBanned: false },).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await User.find({ ...whereCondition, $and: [{ isBloodDonner: true }, { isBanned: false }] }, { password: 0, role: 0, isBanned: 0 }).sort(sortConditions).skip(skip).limit(limit)

    if (!getAllUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get user")
    }

    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    }

}

export const userService = {
    createUserHandler,
    getAllUsers,
    getSingleUser,
    userExistHandler,
    updateUser,
    deleteUser,
    getAllDonner,
    passwordUpdateHandler,
    userBandHandle,
    passwordChangeHandler,
}