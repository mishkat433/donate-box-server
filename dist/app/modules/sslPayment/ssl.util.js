"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateTransactionId = (prefix = 'Tr') => {
    const randomString = crypto_1.default.randomBytes(2).toString('hex');
    const timestamp = Date.now().toString(36).toUpperCase();
    return `${prefix}${timestamp}${randomString}`;
};
exports.generateTransactionId = generateTransactionId;
