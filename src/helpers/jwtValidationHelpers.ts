import httpStatus from 'http-status';
import ApiError from '../Errors/ApiError';
import jwt, { Secret } from "jsonwebtoken"
import { IUser } from '../app/modules/user/user.interface';



const createJsonWebToken = (payload: Partial<IUser>, secretKey: Secret, expiresIn: string) => {


    if (typeof payload !== 'object' || !payload) {
        throw new ApiError(httpStatus.OK, "Payload must be an non empty object")
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new ApiError(httpStatus.OK, "secretKey must be an non empty string")
    }

    try {
        const token = jwt.sign(payload, secretKey, { expiresIn })
        return token
    }
    catch (err) {
        throw new ApiError(httpStatus.OK, "jwt token is not created")
    }
}

const verifyToken = (token: string, secret: Secret) => {
    console.log(secret);
    return jwt.verify(token, secret)
}


export const jwtValidation = { createJsonWebToken, verifyToken }