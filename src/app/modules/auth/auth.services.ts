import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import bcrypt from 'bcryptjs';
import { jwtValidation } from "../../../helpers/jwtValidationHelpers";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { IUserAdminLoginResponse, IUserLogin } from "./auth.interface";
import { User } from "../user/user.model";
import { USER_ROLE } from "../../../enums/userEnums";
import config from "../../../config";
import { Admin } from "../admin/admin.model";
import { IUser } from "../user/user.interface";
import { IAdmin, REQUEST_TYPE } from "../admin/admin.interface";




const loginUser = async (payload: IUserLogin): Promise<IUserAdminLoginResponse> => {

    if (payload.role !== "USER") {
        return loginAdmin(payload)
    }

    const isExist: any = await User.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, fullName: 1, password: 1, userId: 1, isBanned: 1 }).lean()

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist with this phone number")
    }

    if (isExist?.isBanned) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "You are Banned, Please contact authority")
    }


    const isPasswordMatch = await bcrypt.compare(payload.password, isExist.password);

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "invalid password");
    }

    const role: string = isExist.role;
    const userId: string = isExist.userId;
    const fullName: string = isExist.fullName;

    const tokenData: object = { userId, role, fullName }

    const access_token = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '5m')

    const refresh_token = jwtValidation.createJsonWebToken(tokenData, config.REFRESH_JWT_SECRET as Secret, '7d')

    return {
        access_token,
        refresh_token
    }
}

const loginAdmin = async (payload: IUserLogin): Promise<IUserAdminLoginResponse> => {

    const isExist = await Admin.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, fullName: 1, password: 1, adminId: 1, status: 1, isBanned: 1 }).lean()


    if (!isExist) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin doesn't exist with this phone number")
    }
    if (isExist?.isBanned) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "You are Banned, Please contact authority")
    }

    if (isExist?.status !== REQUEST_TYPE.ACCEPT) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, `Your Admin Registration Request is ${isExist?.status}`)
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isExist.password);

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "invalid password");
    }

    const role: string = isExist.role;
    const adminId: string = isExist.adminId;
    const fullName: string = isExist.fullName;

    const tokenData: object = { adminId, role, fullName }

    const access_token = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '5m')

    const refresh_token = jwtValidation.createJsonWebToken(tokenData, config.REFRESH_JWT_SECRET as Secret, '7d')

    return {
        access_token,
        refresh_token
    }
}

const handleLoginUserData = async (id: string, token: any): Promise<IUser[] | IAdmin[]> => {

    if (!token) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "user id not found")
    }

    const checkUser = jwtValidation.verifyToken(token, config.ACCESS_JWT_SECRET_KEY as string) as JwtPayload

    if ((checkUser.role === USER_ROLE.ADMIN && checkUser.adminId === id) || (checkUser.role === USER_ROLE.SUPER_ADMIN && checkUser.adminId === id)) {
        const getAdmin: any = await Admin.find({ adminId: id }).select({ secret: 0 });

        if (!getAdmin) {
            throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
        }

        if (getAdmin.isBanned) {
            throw new ApiError(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, "You are Banned, Please contact authority")
        }

        return getAdmin

    }
    else if (checkUser.role === USER_ROLE.USER && checkUser.userId === id) {
        const getUser:any = await User.find({ userId: id });

        if (!getUser) {
            throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "single user get failed")
        }
        if (getUser.isBanned) {
            throw new ApiError(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, "You are Banned, Please contact authority")
        }

        return getUser
    }
    else {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "some thing went wrong")
    }


}

const refreshToken = async (token: string): Promise<IUserAdminLoginResponse> => {

    let verifyToken: any = null

    try {
        verifyToken = jwtValidation.verifyToken(token, config.REFRESH_JWT_SECRET as Secret)

    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
    }

    let userId: string = ""
    let role: string = verifyToken.role
    let adminId: string = ""
    let isExist: any = null

    if (verifyToken.role === USER_ROLE.USER) {
        userId = verifyToken.userId
        adminId = ""
    }
    else {
        adminId = verifyToken.adminId
        userId = ""
    }

    userId.length > 1 ? isExist = User.findOne({ $and: [{ userId }, { role }] }) : isExist = Admin.findOne({ $and: [{ adminId }, { role }] })


    if (!isExist) {
        throw new ApiError(httpStatus.FORBIDDEN, "cannot find user with your provided token");
    }

    let tokenData: object = {}

    if (adminId) {
        tokenData = { adminId, role }
    }
    else {
        tokenData = { userId, role }
    }

    const newAccessToken = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '5m')

    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')

    return {
        access_token: newAccessToken,
    }

}

export const authServices = {
    loginUser,
    loginAdmin,
    refreshToken,
    handleLoginUserData
}