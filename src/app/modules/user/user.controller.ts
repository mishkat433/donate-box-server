import { Request, RequestHandler, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import { userFilterableField } from "./user.constants";
import { paginationField } from "../../../constance/pagination";


const createUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body

    const result = await userService.createUserHandler(userData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})

const getAllUsers: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, userFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await userService.getAllUsers(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data
    })
})

const getAllDonner: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, userFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const result = await userService.getAllDonner(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'donner fetched successfully',
        meta: result.meta,
        data: result.data
    })
})

const getSingleUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const result = await userService.getSingleUser(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
})

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const { phoneNumber, password, ...payload } = req.body


    const result = await userService.updateUser(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: result
    })
})

const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const result = await userService.deleteUser(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User delete successfully',
        data: result
    })
})

export const userController = {
    createUserHandler,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllDonner
}