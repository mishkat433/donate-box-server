"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundDonnerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fundDonner_controller_1 = require("./fundDonner.controller");
const router = express_1.default.Router();
router.post("/init-payment", fundDonner_controller_1.fundDonnerController.initPaymentHandler);
exports.fundDonnerRoutes = router;
