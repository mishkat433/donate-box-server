import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { USER_ROLE } from "../../../enums/userEnums";
import { Admin } from "./admin.model";
import { generateAdminId } from "./admin.utils";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { userSearchableFields } from "./admin.constants";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from 'mongoose';
import { IGenericResponse, IVerifiedUser } from "../../../globalInterfaces/common";
import checkExist from "../../../helpers/ifExistHelper";
import { IAdmin, IAdminFilter, REQUEST_TYPE } from "./admin.interface";
import config from "../../../config";
import { jwtValidation } from "../../../helpers/jwtValidationHelpers";
import { JwtPayload, Secret } from "jsonwebtoken";



const createAdminHandler = async (payload: IAdmin): Promise<string> => {

    if (payload.secretKey !== config.ADMIN_SECRET_KEY) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin secret is incorrect");
    }

    if (payload.role === USER_ROLE.USER) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin role is not correct")
    }

    const genAId = await generateAdminId()
    payload.adminId = genAId

    const createUser = await Admin.create(payload);

    if (!createUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin creation failed")
    }

    return "your Admin registration send is successfully, Please wait for Accepting your Request"
}

const adminRequestHandler = async (adminId:string, status:REQUEST_TYPE): Promise<IAdmin> => {

await checkExist(Admin, { adminId }, { adminId: 1 })

const result = await Admin.findOneAndUpdate({ adminId }, {status:status}, { new: true });

if (!result) {
    throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin request update failed")
}

return result
}



const getAllAdmins = async (filters: IAdminFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAdmin[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    // Always exclude "SUPER_ADMIN" role
    andCondition.push({ role: { $ne: "SUPER_ADMIN" } })

    if (searchTerm) {
        andCondition.push({
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

const getSingleAdmin = async (id: string, token: string | undefined): Promise<IAdmin[]> => {

    if (token === undefined) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "token is not found")
    }

    const verifiedUser: string | JwtPayload = jwtValidation.verifyToken(token, config.ACCESS_JWT_SECRET_KEY as Secret) as IVerifiedUser

    if (verifiedUser.role !== USER_ROLE.SUPER_ADMIN && id !== verifiedUser.adminId) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "bad request")
    }

    const getUser = await Admin.find({ adminId: id });

    if (!getUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
    }

    return getUser
}

const adminBandHandle = async (adminId: string, payload: { isBanned: boolean }) => {

    await checkExist(Admin, { adminId }, { userId: 1 })

    const result = await Admin.findOneAndUpdate({ adminId }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin banned failed")
    }

    return result
}

const updateAdmin = async (id: string, payload: IAdmin) => {

    await checkExist(Admin, { adminId: id }, { adminId: 1 })

    const result = await Admin.findOneAndUpdate({ adminId: id }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin update failed")
    }

    return result
}

const deleteAdmin = async (id: string) => {

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
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
    adminBandHandle,
    adminRequestHandler
}