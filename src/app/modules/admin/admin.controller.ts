import { Request, RequestHandler, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adminService } from "./admin.service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableField } from "./admin.constants";
import { paginationField } from "../../../constance/pagination";
import { IAdmin } from "./admin.interface";


const createAdminHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const adminData = req.body

    const result = await adminService.createAdminHandler(adminData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin create request send successfully',
        data: result
    })
})

const getAllAdmins: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, userFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await adminService.getAllAdmins(filters, paginationOptions)

    sendResponse<IAdmin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin fetched successfully',
        meta: result.meta,
        data: result.data
    })
})

const getSingleUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const token = req.headers.authorization

    const result = await adminService.getSingleAdmin(id, token)

    sendResponse<IAdmin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin fetched successfully',
        data: result
    })
})

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const { phoneNumber, password, ...payload } = req.body


    const result = await adminService.updateAdmin(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: result
    })
})

const adminBandHandle: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const payload = req.body

    const result = await adminService.adminBandHandle(id, payload)

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin banned successful',
        data: result
    })
})

const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const result = await adminService.deleteAdmin(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User delete successfully',
        data: result
    })
})

const adminRequestHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { adminId } = req.params

    const result = await adminService.adminRequestHandler(adminId, req?.body?.status)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'successfully handle request',
        data: result
    })
})

export const adminController = {
    createAdminHandler,
    getAllAdmins,
    getSingleUser,
    updateUser,
    deleteUser,
    adminBandHandle,
    adminRequestHandler
}