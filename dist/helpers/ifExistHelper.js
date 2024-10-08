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
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../Errors/ApiError"));
const checkExist = (dbName_1, findField_1, other_1, ...args_1) => __awaiter(void 0, [dbName_1, findField_1, other_1, ...args_1], void 0, function* (dbName, findField, other, message = "User") {
    const isExist = yield dbName.findOne(findField, Object.assign({ role: 1, password: 1 }, other)).lean();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${message} does not exist`);
    }
    return isExist;
});
exports.default = checkExist;
