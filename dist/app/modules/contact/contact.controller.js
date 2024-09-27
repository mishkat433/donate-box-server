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
exports.contactController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const contact_services_1 = require("./contact.services");
const pick_1 = __importDefault(require("../../../shared/pick"));
const contact_constance_1 = require("./contact.constance");
const pagination_1 = require("../../../constance/pagination");
const createContact = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield contact_services_1.contactServices.createContact(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully send your messages',
        data: result
    });
}));
const getAllContactMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, contact_constance_1.contactFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationField);
    const result = yield contact_services_1.contactServices.getAllContactMessage(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All contact info fetched successfully',
        meta: result.meta,
        data: result.data
    });
}));
const updateContactMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    console.log(req.body);
    const result = yield contact_services_1.contactServices.updateContactMessage(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully update contact messages and status',
        data: result
    });
}));
const deleteContactMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield contact_services_1.contactServices.deleteContactMessage(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully delete contact messages',
        data: result
    });
}));
exports.contactController = {
    createContact,
    getAllContactMessage,
    deleteContactMessage,
    updateContactMessage
};
