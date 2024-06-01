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
exports.donnerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../../constance/pagination");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const user_constants_1 = require("../user/user.constants");
const user_service_1 = require("../user/user.service");
const createBloodDonner = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.userService.createUserHandler(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blood donner created successfully',
        data: result
    });
}));
const getAllDonner = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield user_service_1.userService.getAllUsers(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Donner fetched successfully',
        meta: result.meta,
        data: result.data
    });
}));
// const getAllDonner: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const filters = pick(req.query, userFilterableField);
//     const paginationOptions = pick(req.query, paginationField);
//     const result = await userService.getAllDonner(filters, paginationOptions)
//     sendResponse<IUser[]>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'donner fetched successfully',
//         meta: result.meta,
//         data: result.data
//     })
// })
// const getSingleUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params
//     const result = await userService.getSingleUser(id)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User fetched successfully',
//         data: result
//     })
// })
// const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params
//     const { phoneNumber, password, ...payload } = req.body
//     const result = await userService.updateUser(id, payload)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User update successfully',
//         data: result
//     })
// })
// const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params
//     const result = await userService.deleteUser(id)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User delete successfully',
//         data: result
//     })
// })
exports.donnerController = {
    createBloodDonner,
    getAllDonner,
    // getSingleUser,
    // updateUser,
    // deleteUser,
    // getAllDonner
};
