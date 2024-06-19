import { RequestHandler, Response, Request, NextFunction } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { authServices } from "./auth.services"
import { IUserAdminLoginResponse } from "./auth.interface"
import sendCookies from "../../../helpers/sendCookiesHelper"
import httpStatus from "http-status"
import clearCookies from "../../../helpers/clearCookies"
import { IUser } from "../user/user.interface"
import { IAdmin } from "../admin/admin.interface"

const loginHandle: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body

    const result = await authServices.loginUser(payload)

    const { refresh_token, ...access_token } = result

    sendResponse<IUserAdminLoginResponse>(sendCookies(res, refresh_token), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user login successfully',
        data: access_token
    })
})

const handleLogOut: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    // const loginUser = await authServices.loginUser(loginData)

    sendResponse(clearCookies(res), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logOut successfully',
    })
})

const handleLoginUserData: RequestHandler = catchAsync(async (req: Request, res: Response) => {
const id =req.params.id;
const token= req.headers?.authorization

    const result = await authServices.handleLoginUserData(id, token)

    sendResponse<IUser[] | IAdmin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user data fetched successfully',
        data:result
    })
})


const refreshToken: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.cookies
    const result = await authServices.refreshToken(payload.refresh_token)

    const { ...access_token } = result

    sendResponse<IUserAdminLoginResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'refresh toke fetched successfully',
        data: access_token
    })
})

export const authController = {
    loginHandle,
    handleLogOut,
    refreshToken,
    handleLoginUserData
}