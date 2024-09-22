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
exports.statisticService = void 0;
const user_model_1 = require("../user/user.model");
const donateList_model_1 = require("../donateList/donateList.model");
const getStatisticHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999);
    const totalTodaysRequest = yield donateList_model_1.DonateHistory.find({ createdAt: { $gte: startDate, $lte: endDate } }).countDocuments();
    const totalDonner = yield user_model_1.User.find().countDocuments();
    const totalBloodDonation = yield donateList_model_1.DonateHistory.find({ status: "ACCEPT" }).countDocuments();
    const result = { totalDonner, totalBloodDonation, totalAmountDonation: 1000, totalTodaysRequest, totalVolunteer: 1000 };
    return result;
});
exports.statisticService = {
    getStatisticHandler
};
