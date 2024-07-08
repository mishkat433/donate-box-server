import { IStatistic } from "./statistics.interface"
import { User } from "../user/user.model"
import { DonateHistory } from "../donateList/donateList.model";


const getStatisticHandler = async (): Promise<IStatistic> => {

    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999);

    const totalTodaysRequest = await DonateHistory.find({ createdAt: { $gte: startDate, $lte: endDate } }).countDocuments();

    const totalDonner = await User.find().countDocuments();

    const totalBloodDonation = await DonateHistory.find({ status: "ACCEPT" }).countDocuments()

    const result = { totalDonner, totalBloodDonation, totalAmountDonation: 1000, totalTodaysRequest, totalVolunteer: 1000 }

    return result
}


export const statisticService = {
    getStatisticHandler
}