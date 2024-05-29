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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const cows_mode_1 = require("./cows.mode");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cows_constants_1 = require("./cows.constants");
const createCow = (cowData) => __awaiter(void 0, void 0, void 0, function* () {
    cowData.cowId = 'Cow' + Math.floor(Math.random() * 1420);
    const result = cows_mode_1.Cows.create(cowData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created");
    }
    return result;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice, searchTerm } = filters, filtersData = __rest(filters, ["minPrice", "maxPrice", "searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: cows_constants_1.cowsSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    if (minPrice) {
        andCondition.push({ price: { $gte: minPrice } });
    }
    if (maxPrice) {
        andCondition.push({ price: { $lte: maxPrice } });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield cows_mode_1.Cows.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const getAllUser = yield cows_mode_1.Cows.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);
    // const getAllUser = await Cows.find({ price: { $gte: 40000, $lte: 50000 } }).sort(sortConditions).skip(skip).limit(limit)
    if (!getAllUser) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to get cows");
    }
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    };
});
const getSingleCows = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_mode_1.Cows.findOne({ _id: id }, { password: 0 });
    // if (!result) {
    //     throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, `Cow not found with this id (${id})`);
    // }
    return result;
});
const updateCows = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_mode_1.Cows.findByIdAndUpdate({ _id: id }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to update cow");
    }
    return result;
});
const deleteCows = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCows = yield cows_mode_1.Cows.findByIdAndDelete({ _id: id });
    if (!deleteCows) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Something went wrong, cow cannot be deleted");
    }
    return deleteCows;
});
exports.cowServices = {
    createCow,
    getAllCows,
    getSingleCows,
    updateCows,
    deleteCows,
};
