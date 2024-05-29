"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowValidation = void 0;
const zod_1 = require("zod");
const cows_constants_1 = require("./cows.constants");
const createCowZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        sellerId: zod_1.z.string({
            required_error: 'sellerId is required',
        }),
        name: zod_1.z.string({
            required_error: 'Cow name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Cow age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Cow price is required',
        }),
        location: zod_1.z.enum([...cows_constants_1.cow_location], {
            required_error: 'user role is required',
        }),
        breed: zod_1.z.enum([...cows_constants_1.cow_breed], {
            required_error: 'user role is required',
        }),
        weight: zod_1.z.number({
            required_error: 'cow weight is required',
        }),
        label: zod_1.z.enum([...cows_constants_1.cow_label], {
            required_error: 'cow label is required',
        }),
        category: zod_1.z.enum([...cows_constants_1.cow_category], {
            required_error: 'user role is required',
        }),
    }),
});
exports.cowValidation = {
    createCowZodValidation,
};
