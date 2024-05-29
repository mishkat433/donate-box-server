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
exports.orderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const orders_model_1 = require("./orders.model");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const cows_mode_1 = require("../cows/cows.mode");
const user_mode_1 = require("../users/user.mode");
const mongoose_1 = __importDefault(require("mongoose"));
const orders_constants_1 = require("./orders.constants");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// : Promise<IOrder | null>
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const cow = yield cows_mode_1.Cows.findOne({ cowId: orderData.cowId, label: { $ne: "sold out" } });
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Cow is already sold out or doesn't exist.");
    }
    const buyer = yield user_mode_1.User.findOne({ userId: orderData.buyerId });
    if (!buyer || buyer.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Buyer doesn't have enough funds.");
    }
    const seller = yield user_mode_1.User.findOne({ userId: cow.sellerId });
    if (!seller) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "seller not found");
    }
    const updateCow = yield cows_mode_1.Cows.updateOne({ cowId: orderData.cowId }, { $set: { label: "sold out" } });
    if (!updateCow) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "something went wrong when updating the cow label");
    }
    const decreasePrice = yield user_mode_1.User.updateOne({ userId: orderData.buyerId }, { $inc: { budget: -cow.price } });
    if (!decreasePrice) {
        yield cows_mode_1.Cows.updateOne({ cowId: orderData.cowId }, { $set: { label: "for sale" } });
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "something went wrong when trying to decrease");
    }
    const increasePrice = yield user_mode_1.User.updateOne({ userId: cow.sellerId }, { $inc: { income: cow.price } });
    if (!increasePrice) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "something went wrong in order to increase");
    }
    const result = yield orders_model_1.Order.create(orderData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created");
    }
    session.endSession();
    return result;
});
// const createOrder = async (orderData: IOrder) => {
//     const session = await mongoose.startSession()
//     session.startTransaction();
//     try {
//         // Step 1: Check if the cow is not sold
//         const cow = await Cows.findOne(
//             { cowId: orderData.cowId, label: { $ne: "sold out" } },
//             { session }
//         );
//         if (!cow) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "cow not found" as string)
//         }
//         // Step 2: Ensure the buyer has enough funds
//         const buyer = await User.findOne(
//             { userId: orderData.buyerId },
//             { session }
//         );
//         if (!buyer || buyer.budget < cow.price) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "buyer not found" as string)
//         }
//         // Step 3: Get the seller
//         const seller = await User.findOne(
//             { userId: cow.sellerId },
//             { session }
//         );
//         if (!seller) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "seller not found" as string)
//         }
//         await Cows.updateOne(
//             { cowId: orderData.cowId },
//             { $set: { label: "sold out" } },
//             { session }
//         );
//         await User.updateOne(
//             { userId: orderData.buyerId },
//             { $inc: { balance: -cow.price } },
//             { session }
//         );
//         await User.updateOne(
//             { userId: cow.sellerId },
//             { $inc: { balance: cow.price } },
//             { session }
//         );
//         await Order.create(
//             {
//                 orderData
//             },
//             { session }
//         );
//         await session.commitTransaction();
//         session.endSession();
//         console.log("Transaction successful: Cow has been sold.");
//     } catch (error) {
//         await session.abortTransaction();
//         console.error("Transaction failed:", (error as Error).message);
//     } finally {
//         session.endSession();
//     }
// }
const getOrder = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: orders_constants_1.orderSearchableField.map((field) => ({
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
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const count = yield orders_model_1.Order.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield orders_model_1.Order.aggregate([
        { $match: whereCondition },
        {
            $lookup: {
                from: "users",
                localField: "buyerId",
                foreignField: "userId",
                as: "buyer_data"
            }
        },
        {
            $lookup: {
                from: "cows",
                localField: "cowId",
                foreignField: "cowId",
                as: "cow_data"
            }
        },
        {
            $project: {
                orderDetails: 1,
                buyer_data: 1,
                cow_data: 1
            }
        },
        { $project: { "buyer_data.password": 0 } },
        { $skip: skip },
        { $limit: limit }
    ]);
    // return result
    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    };
});
const getMyOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.aggregate([
        { $match: { buyerId: id } },
        {
            $lookup: {
                from: "users",
                localField: "buyerId",
                foreignField: "userId",
                as: "buyer_data"
            }
        },
        {
            $lookup: {
                from: "cows",
                localField: "cowId",
                foreignField: "cowId",
                as: "cow_data"
            }
        },
        {
            $unwind: "$cow_data"
        },
        {
            $lookup: {
                from: "users",
                localField: "cow_data.sellerId",
                foreignField: "userId",
                as: "cow_data.cow_seller"
            }
        },
        {
            $project: {
                orderDetails: 1,
                buyer_data: 1,
                cow_data: 1,
            }
        },
        { $project: { "buyer_data.password": 0, "cow_data.cow_seller.password": 0 } },
    ]);
    return result;
});
exports.orderServices = {
    createOrder,
    getOrder,
    getMyOrder,
};
