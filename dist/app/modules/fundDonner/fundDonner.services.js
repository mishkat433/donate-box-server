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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundDonnerServices = void 0;
const ssl_service_1 = require("../sslPayment/ssl.service");
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sslSession = ssl_service_1.sslPaymentService.initPayment(payload);
    return sslSession;
});
exports.fundDonnerServices = {
    initPayment
};
