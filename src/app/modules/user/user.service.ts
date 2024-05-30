import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { USER_ROLE } from "../../../enums/userEnums";
import { IUser, IUserFilter } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { userSearchableFields } from "./user.constants";
import { paginationHelper } from "../../../helpers/paginationHelper";
import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from "../../../globalInterfaces/common";
import checkExist from "../../../helpers/ifExistHelper";


const createUserHandler = async (payload: IUser): Promise<string> => {

    if (payload.isBloodDonner && !payload?.bloodGroup) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Must be select blood group")
    }

    payload.role = USER_ROLE.USER

    const genUId = await generateUserId()
    payload.userId = genUId



    const createUser = await User.create(payload);

    if (!createUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user creation failed")
    }

    return "User created successfully"
}

const getAllUsers = async (filters: IUserFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IUser[]>> => {

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

const getSingleUser = async (id: string) => {

    const getUser = await User.find({ userId: id });

    if (!getUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
    }

    return getUser
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

const deleteUser = async (userId: string) => {

    await checkExist(User, { userId: userId }, { userId: 1 })

    const result = await User.deleteOne({ userId });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user delete failed")
    }

    return result
}


export const userService = {
    createUserHandler,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllDonner
}