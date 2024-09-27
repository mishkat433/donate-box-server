import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { IContact } from "./contact.interface"
import { contactServices } from "./contact.services"
import pick from "../../../shared/pick"
import { contactFilterableFields } from "./contact.constance"
import { paginationField } from "../../../constance/pagination"

const createContact: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body

    const result = await contactServices.createContact(payload)

    sendResponse<IContact>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully send your messages',
        data: result
    })
})


const getAllContactMessage: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, contactFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await contactServices.getAllContactMessage(filters, paginationOptions)

    sendResponse<IContact[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All contact info fetched successfully',
        meta: result.meta,
        data: result.data
    })
})


const updateContactMessage: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    const payload = req.body

    console.log(req.body)

    const result = await contactServices.updateContactMessage(id, payload)

    sendResponse<IContact>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully update contact messages and status',
        data: result
    })
})


const deleteContactMessage: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await contactServices.deleteContactMessage(id)

    sendResponse<IContact>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully delete contact messages',
        data: result
    })
})





export const contactController = {
    createContact,
    getAllContactMessage,
    deleteContactMessage,
    updateContactMessage

}