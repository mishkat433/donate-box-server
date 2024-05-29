/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { ErrorRequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../globalInterfaces/error";
import handleValidationError from "../../Errors/handleValidationError";
import ApiError from "../../Errors/ApiError";
import { ZodError } from "zod"
import handleZodError from "../../Errors/handleZodError";
import handleCastError from "../../Errors/handleCastError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    console.log(err)

    let statusCode = 500;
    let message = 'something went wrong'
    let errorMessages: IGenericErrorMessage[] = []

    if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof ApiError) {
        statusCode = err.statusCode
        message = err.message
        errorMessages = err?.message ? [{
            path: "",
            message: err?.message
        }] : []
    }
    else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err?.message;
        errorMessages = err?.message ? [{
            path: '',
            message: err?.message
        }] : []
    }


    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? err?.stack : undefined
    })
}

export default globalErrorHandler;