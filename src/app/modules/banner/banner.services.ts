import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { Banner } from "./banner.model";
import { IBanner } from "./banner.interface";
import { IDeleteType, IUpdateType } from "../../../constance/updateDelete";



const createBannerHandler = async (payload: string): Promise<IBanner> => {

    const createBanner = await Banner.create(payload)

    if (!createBanner) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, 'failed to create banner')
    }
    return createBanner
}

const getAllBanners = async (): Promise<IBanner[]> => {

    const result = await Banner.aggregate([
        {
            $lookup: {
                from: "admins",
                localField: "creatorId",
                foreignField: "adminId",
                as: "admin_Data"
            }
        },
        {
            $unwind: "$admin_Data"
        },
        {
            $project: {
                "admin_Data.role": 0,
                "admin_Data.secretKey": 0,
                "admin_Data.password": 0,
                "admin_Data.profileImage": 0,
                "admin_Data.gender": 0,
                "admin_Data.createdAt": 0,
                "admin_Data.updatedAt": 0
            }
        }

    ])

    return result


}

const updateBanner = async (id: string, payload: boolean): Promise<IUpdateType> => {


    const updateBanner = await Banner.updateOne({ _id: id }, { showing: payload }, { new: true })

    if (!updateBanner) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, 'failed to update banner')
    }
    return updateBanner
}
const deleteBanner = async (payload: string): Promise<IDeleteType> => {

    const createBanner = await Banner.deleteOne({ _id: payload })

    if (!createBanner) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, 'failed to create banner')
    }
    return createBanner
}


export const bannerServices = {
    getAllBanners,
    createBannerHandler,
    deleteBanner,
    updateBanner
}