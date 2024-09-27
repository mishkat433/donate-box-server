"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donateHistoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const donateList_service_1 = require("./donateList.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const donateList_constance_1 = require("./donateList.constance");
const pagination_1 = require("../../../constance/pagination");
const NeedDonnerRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield donateList_service_1.donateHistoryService.createNeedDonateRequest(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Request send successfully',
        data: result
    });
}));
const decideRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const result = yield donateList_service_1.donateHistoryService.assignDonner(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Donner decide successfully',
        data: result
    });
}));
const getAllRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donateList_constance_1.requestFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield donateList_service_1.donateHistoryService.getAllRequest(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All request fetch successfully',
        data: result
    });
}));
const getPendingRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donateList_constance_1.requestFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield donateList_service_1.donateHistoryService.getPendingRequest(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All pending request fetch successfully',
        data: result
    });
}));
const myActivity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donateList_constance_1.requestFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const id = req.params.id;
    const result = yield donateList_service_1.donateHistoryService.myActivity(filters, paginationOptions, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'my activity fetch successfully',
        data: result
    });
}));
const myRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donateList_constance_1.requestFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield donateList_service_1.donateHistoryService.myRequest(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All pending request fetch successfully',
        data: result
    });
}));
const deleteRequestHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donateList_service_1.donateHistoryService.deleteRequest(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Request delete successfully',
        data: result
    });
}));
// const getSingleRequest: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // const payload = req.body
//     // const result = await donateHistoryService.createDonateRequest(payload)
//     // sendResponse(res, {
//     //     statusCode: httpStatus.OK,
//     //     success: true,
//     //     message: 'Request send successfully',
//     //     data: result
//     // })
// })
exports.donateHistoryController = {
    NeedDonnerRequest,
    getAllRequest,
    getPendingRequest,
    decideRequest,
    myActivity,
    myRequest,
    deleteRequestHandler
    // requestResponse,
};
