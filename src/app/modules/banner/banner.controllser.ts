import { RequestHandler, Request, NextFunction, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { IBanner } from "./banner.interface"
import { bannerServices } from "./banner.services"
import { IDeleteType, IUpdateType } from "../../../constance/updateDelete"


const createBanner: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body

    const result = await bannerServices.createBannerHandler(payload)

    sendResponse<IBanner>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Banner added successfully',
        data: result
    })
})

const getAllBanner: RequestHandler = catchAsync(async (req: Request, res: Response) => {


    // const filters = pick(req.query, userFilterableField);
    // const paginationOptions = pick(req.query, paginationField);

    const result = await bannerServices.getAllBanners()


    sendResponse<IBanner[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Banner fetched successfully',
        data: result
    })
})


const updateBanner: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { showing } = req.body
    const { id } = req.params

    const result = await bannerServices.updateBanner(id, showing)


    sendResponse<IUpdateType>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Banner update successfully',
        data: result
    })
})

const deleteBanner: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const result = await bannerServices.deleteBanner(req.params.id)


    sendResponse<IDeleteType>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Banner delete successfully',
        data: result
    })
})

export const bannerController = {
    getAllBanner,
    createBanner,
    deleteBanner,
    updateBanner
}