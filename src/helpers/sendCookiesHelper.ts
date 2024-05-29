import { Response } from "express";
import config from "../config";


const sendCookies = (res: Response, token: string | undefined): Response<Record<string, unknown>> => {
    res.cookie('refresh_token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: config.env === 'production'
    })

    return res;
}

export default sendCookies;