import httpStatus from "http-status";
import { IContact, IContactFiler } from "./contact.interface";
import { Contact } from "./contact.model";
import ApiError from "../../../Errors/ApiError";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { contactSearchableFields } from "./contact.constance";
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../globalInterfaces/common";


const createContact = async (payload: IContact): Promise<IContact> => {


    const createContact = await Contact.create(payload);

    if (!createContact) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Message create failed")
    }
    return createContact
}


const getAllContactMessage = async (filters: IContactFiler, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IContact[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            $or: contactSearchableFields.map((field) => ({
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

    const count = await Contact.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const result = await Contact.aggregate([
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "admins",
                localField: "resolverId",
                foreignField: "adminId",
                pipeline: [{
                    $project: {
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
                as: "resolver_Data"
            }

        },
        { $unwind: { path: "$resolver_Data", preserveNullAndEmptyArrays: true } },

    ]).sort(sortConditions).match(whereCondition)


    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to fetch contact message")
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


const updateContactMessage = async (id: string, payload: IContact): Promise<any> => {

    const result = await Contact.findOneAndUpdate({ _id: id }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "contact update failed")
    }

    return result
}


const deleteContactMessage = async (id: string): Promise<IContact> => {

    const deleteMessage = await Contact.findByIdAndDelete({ _id: id });

    if (!deleteMessage) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Failed to delete contact message")
    }
    return deleteMessage
}


export const contactServices = {
    createContact,
    getAllContactMessage,
    deleteContactMessage,
    updateContactMessage
}