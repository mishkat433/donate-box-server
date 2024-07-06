import { Request, Response, NextFunction, RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { statisticService } from "./statistics.services";
import { IStatistic } from "./statistics.interface";


const getAllStatisticData: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await statisticService.getStatisticHandler()

    sendResponse<IStatistic>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'statistics fetched successfully',
        data: result
    })
})





export const statisticsDataController = {
    getAllStatisticData,
    }