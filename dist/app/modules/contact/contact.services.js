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
exports.contactServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const contact_model_1 = require("./contact.model");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const contact_constance_1 = require("./contact.constance");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createContact = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createContact = yield contact_model_1.Contact.create(payload);
    if (!createContact) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Message create failed");
    }
    return createContact;
});
const getAllContactMessage = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: contact_constance_1.contactSearchableFields.map((field) => ({
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
    const count = yield contact_model_1.Contact.find(whereCondition).countDocuments();
    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions, count);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield contact_model_1.Contact.aggregate([
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "admins",
                localField: "resolverId",
                foreignField: "adminId",
                pipeline: [{
                        $project: {
                            secretKey: 0,
                            password: 0,
                            profileImage: 0,
                            gender: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            isBanned: 0,
                            status: 0,
                        }
                    }],
                as: "resolver_Data"
            }
        },
        { $unwind: { path: "$resolver_Data", preserveNullAndEmptyArrays: true } },
    ]).sort(sortConditions).match(whereCondition);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "failed to fetch contact message");
    }
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
const updateContactMessage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.Contact.findOneAndUpdate({ _id: id }, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "contact update failed");
    }
    return result;
});
const deleteContactMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteMessage = yield contact_model_1.Contact.findByIdAndDelete({ _id: id });
    if (!deleteMessage) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Failed to delete contact message");
    }
    return deleteMessage;
});
exports.contactServices = {
    createContact,
    getAllContactMessage,
    deleteContactMessage,
    updateContactMessage
};
