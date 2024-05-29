import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { USER_ROLE } from "../../../enums/userEnums";
import { Admin } from "./admin.model";
import { generateAdminId } from "./admin.utils";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { userSearchableFields } from "./admin.constants";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from 'mongoose';
import { IGenericResponse } from "../../../globalInterfaces/common";
import checkExist from "../../../helpers/ifExistHelper";
import { IAdmin, IAdminFilter } from "./admin.interface";
import config from "../../../config";


const createAdminHandler = async (payload: IAdmin): Promise<string> => {

    if (payload.secretKey !== config.ADMIN_SECRET_KEY) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin secret is incorrect");
    }

    if (payload.role === USER_ROLE.USER) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin role is not correct")
    }

    const genUId = await generateAdminId()
    payload.adminId = genUId

    const createUser = await Admin.create(payload);

    if (!createUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin creation failed")
    }

    return "Admin created successfully"
}

const getAllAdmins = async (filters: IAdminFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAdmin[]>> => {

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

    const count = await Admin.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await Admin.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit)

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

    const getUser = await Admin.find({ adminId: id });

    if (!getUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
    }

    return getUser
}


const updateUser = async (id: string, payload: IAdmin) => {

    await checkExist(Admin, { adminId: id }, { adminId: 1 })

    const result = await Admin.findOneAndUpdate({ adminId: id }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin update failed")
    }

    return result
}

const deleteUser = async (id: string) => {

    await checkExist(Admin, { adminId: id }, { adminId: 1 })

    const result = await Admin.deleteOne({ adminId: id });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user delete failed")
    }

    return result
}


export const adminService = {
    createAdminHandler,
    getAllAdmins,
    getSingleUser,
    updateUser,
    deleteUser
}