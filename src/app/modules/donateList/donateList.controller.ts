import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"
import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { donateHistoryService } from "./donateList.service"
import pick from "../../../shared/pick"
import { requestFilterableField } from "./donateList.constance"
import { paginationField } from "../../../constance/pagination"


const NeedDonnerRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body

    const result = await donateHistoryService.createNeedDonateRequest(payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Request send successfully',
        data: result
    })
})

const decideRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const payload = req.body

    const result = await donateHistoryService.assignDonner(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Donner decide successfully',
        data: result
    })

})


const getAllRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, requestFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await donateHistoryService.getAllRequest(filters, paginationOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All request fetch successfully',
        data: result
    })
})

const getPendingRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, requestFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await donateHistoryService.getPendingRequest(filters, paginationOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All pending request fetch successfully',
        data: result
    })
})

const myActivity: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, requestFilterableField);
    const paginationOptions = pick(req.query, paginationField);
    const id = req.params.id

    const result = await donateHistoryService.myActivity(filters, paginationOptions, id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'my activity fetch successfully',
        data: result
    })
})

const myRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, requestFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await donateHistoryService.myRequest(filters, paginationOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All pending request fetch successfully',
        data: result
    })
})

const deleteRequestHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await donateHistoryService.deleteRequest(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Request delete successfully',
        data: result
    })
})





// const getSingleRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     // const payload = req.body

//     // const result = await donateHistoryService.createDonateRequest(payload)

//     // sendResponse(res, {
//     //     statusCode: httpStatus.OK,
//     //     success: true,
//     //     message: 'Request send successfully',
//     //     data: result
//     // })
// })



export const donateHistoryController = {
    NeedDonnerRequest,
    getAllRequest,
    getPendingRequest,
    decideRequest,
    myActivity,
    myRequest,
    deleteRequestHandler
    // requestResponse,
}