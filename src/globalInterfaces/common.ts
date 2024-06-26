import { JwtPayload } from "jsonwebtoken";
import { IGenericErrorMessage } from "./error";

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[]
}


export type IGenericResponse<T> = {
    meta?: {
        page?: number,
        limit?: number,
        total: number,
        prevPage: number | null,
        nextPages: number | null,
    },
    data: T
}

export interface IVerifiedUser extends JwtPayload {
    role: string;
}