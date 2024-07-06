import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { IDonateHistory, IRequestFilter, IUpdateRequest } from "./donateList.interface";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { IGenericResponse } from "../../../globalInterfaces/common";
import { requestSearchableFields } from "./donateList.constance";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";
import { DonateHistory } from "./donateList.model";
import { REQUEST_TYPE } from "../../../enums/globalEnums";
import nextDateCount from "../../../helpers/dateCount";


const createNeedDonateRequest = async (payload: IDonateHistory): Promise<IDonateHistory> => {

    const result = await DonateHistory.create(payload);

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Request creation failed")
    }

    return result
}

const assignDonner = async (id: string, payload: IUpdateRequest): Promise<any> => {

    if (payload?.status === REQUEST_TYPE.REJECT && !payload.rejectReason) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "You have must write a reject reason")
    }

    const findRequest: any = await DonateHistory.findOne({ _id: id }, { dateOfNeedBlood: 1 })

    payload.nextDonateDate = await nextDateCount(findRequest.dateOfNeedBlood, 3)

    const result = await DonateHistory.updateOne({ _id: id }, payload, { new: true })

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Donner assign failed")
    }

    return result
}

const getAllRequest = async (filters: IRequestFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IDonateHistory[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    andCondition.push({ status: { $ne: "PENDING" } })

    if (searchTerm) {
        andCondition.push({
            $or: requestSearchableFields.map((field) => ({
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

    const count = await DonateHistory.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const result = await DonateHistory.aggregate([
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "admins",
                localField: "adminId",
                foreignField: "adminId",
                pipeline: [{
                    $project: {
                        role: 0,
                        secretKey: 0,
                        password: 0,
                        profileImage: 0,
                        gender: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        isBanned: 0,
                        status: 0,
                    }
                }],
                as: "assigner_Data"
            }

        },
        {
            $lookup: {
                from: "users",
                localField: "donnerId",
                foreignField: "userId",
                pipeline: [{
                    $project: {
                        role: 0,
                        password: 0,
                        profileImage: 0,
                        isBanned: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        _id: 0
                    }
                }],
                as: "donner_Data"
            }

        },
        { $unwind: { path: "$assigner_Data", preserveNullAndEmptyArrays: true }, },
        { $unwind: { path: "$donner_Data", preserveNullAndEmptyArrays: true }, }
    ]).sort(sortConditions).match(whereCondition)


    if (!result) {
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
        data: result
    }

}

const getPendingRequest = async (filters: IRequestFilter, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IDonateHistory[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    andCondition.push({ status: { $eq: "PENDING" } })

    if (searchTerm) {
        andCondition.push({
            $or: requestSearchableFields.map((field) => ({
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

    const count = await DonateHistory.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const result = await DonateHistory.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit)

    if (!result) {
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
        data: result
    }

}


export const donateHistoryService = {
    createNeedDonateRequest,
    getAllRequest,
    getPendingRequest,
    assignDonner,
    // responseRequest
}