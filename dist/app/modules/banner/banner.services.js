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
exports.bannerServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const banner_model_1 = require("./banner.model");
const createBannerHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createBanner = yield banner_model_1.Banner.create(payload);
    if (!createBanner) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, 'failed to create banner');
    }
    return createBanner;
});
const getAllBanners = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield banner_model_1.Banner.aggregate([
        {
            $lookup: {
                from: "admins",
                localField: "creatorId",
                foreignField: "adminId",
                as: "admin_Data"
            }
        },
        {
            $unwind: "$admin_Data"
        },
        {
            $project: {
                "admin_Data.role": 0,
                "admin_Data.secretKey": 0,
                "admin_Data.password": 0,
                "admin_Data.profileImage": 0,
                "admin_Data.gender": 0,
                "admin_Data.createdAt": 0,
                "admin_Data.updatedAt": 0
            }
        }
    ]);
    return result;
});
const updateBanner = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBanner = yield banner_model_1.Banner.updateOne({ _id: id }, { showing: payload }, { new: true });
    if (!updateBanner) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, 'failed to update banner');
    }
    return updateBanner;
});
const deleteBanner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createBanner = yield banner_model_1.Banner.deleteOne({ _id: payload });
    if (!createBanner) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, 'failed to create banner');
    }
    return createBanner;
});
exports.bannerServices = {
    getAllBanners,
    createBannerHandler,
    deleteBanner,
    updateBanner
};
