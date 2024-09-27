import { Request, RequestHandler, Response, NextFunction } from "express"
import catchAsync from "../../../shared/catchAsync"
import { fundDonnerServices } from "./fundDonner.services"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"


const initPaymentHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const paymentData = req.body

    const result = await fundDonnerServices.initPayment(paymentData)

    sendResponse<any>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment init successfully',
        data: result
    })
})


export const fundDonnerController = {
    initPaymentHandler
}