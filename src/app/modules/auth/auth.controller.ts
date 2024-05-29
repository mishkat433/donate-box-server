import { RequestHandler, Response, Request, NextFunction } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { authServices } from "./auth.services"
import { IUserAdminLoginResponse } from "./auth.interface"
import sendCookies from "../../../helpers/sendCookiesHelper"
import httpStatus from "http-status"

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
    refreshToken
}