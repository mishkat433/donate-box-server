"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
const mongoose_1 = require("mongoose");
const cowsEnums_1 = require("../../../enums/cowsEnums");
const cowSchema = new mongoose_1.Schema({
    cowId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Cow name is required"]
    },
    age: {
        type: Number,
        required: [true, "Cow age is required"]
    },
    price: {
        type: Number,
        required: [true, "Cow price is required"]
    },
    location: {
        type: String,
        enum: cowsEnums_1.COW_LOCATION,
        required: [true, "Cow location is required"]
    },
    breed: {
        type: String,
        enum: cowsEnums_1.COW_BREED,
        required: [true, "Cow breed is required"]
    },
    weight: {
        type: Number,
        required: [true, "Cow weight is required"]
    },
    label: {
        type: String,
        enum: cowsEnums_1.COW_LABEL,
        default: cowsEnums_1.COW_LABEL.forSale
    },
    category: {
        type: String,
        enum: cowsEnums_1.COW_CATEGORY,
        required: [true, "Cow category is required"]
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cows = (0, mongoose_1.model)('cows', cowSchema);
