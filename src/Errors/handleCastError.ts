import mongoose from "mongoose"
import { IGenericErrorResponse } from "../globalInterfaces/common"
import { IGenericErrorMessage } from "../globalInterfaces/error"



const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = [
        {
            path: err.path,
            message: "Invalid Id"
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message: "Cast error",
        errorMessages: errors
    }
}

export default handleCastError;