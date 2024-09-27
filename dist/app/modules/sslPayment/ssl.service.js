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
exports.sslPaymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const axios_1 = __importDefault(require("axios"));
const ssl_util_1 = require("./ssl.util");
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.SSL_STORE_ID,
            store_passwd: config_1.default.SSL_SECRET_KEY,
            total_amount: payload.donateAmount,
            currency: 'BDT',
            tran_id: (0, ssl_util_1.generateTransactionId)(),
            success_url: 'http://localhost:3000/payment-success',
            fail_url: 'http://localhost:3000/payment-faild',
            cancel_url: 'http://localhost:3000/payment-cancel',
            ipn_url: 'http://localhost:3000/ipn',
            shipping_method: 'N/A',
            product_name: 'Donate Payment',
            product_category: 'Donate',
            product_profile: 'Donate',
            cus_name: payload.name,
            cus_email: 'mishkat5826@gmail.com',
            cus_add1: 'Chittagong',
            cus_add2: 'Chittagong',
            cus_city: 'Chittagong',
            cus_state: 'Chittagong',
            cus_postcode: '4770',
            cus_country: 'Bangladesh',
            cus_phone: '01521486215',
            cus_fax: '01521486215',
            ship_name: 'Customer Name',
            ship_add1: 'Chittagong',
            ship_add2: 'Chittagong',
            ship_city: 'Chittagong',
            ship_state: 'Chittagong',
            ship_postcode: 4770,
            ship_country: 'Bangladesh',
        };
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: config_1.default.SSL_PAYMENT_URL,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    }
    catch (err) {
        console.error('Error during payment initialization:', err);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Payment error');
    }
});
exports.sslPaymentService = {
    initPayment
};
