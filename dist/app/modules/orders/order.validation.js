"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const createOrderValidation = zod_1.z.object({
    body: zod_1.z.object({
        cowId: zod_1.z.string({
            required_error: 'cowId is required',
        }),
        buyerId: zod_1.z.string({
            required_error: 'buyerId is required',
        })
    })
});
exports.orderValidation = {
    createOrderValidation,
};
