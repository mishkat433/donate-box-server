import { IStatistic } from "./statistics.interface"
import { User } from "../user/user.model"


const getStatisticHandler = async (): Promise<IStatistic> => {

const totalDonner= await User.find().countDocuments();


const result={totalDonner,totalBloodDonation:0,totalAmountDonation:0, totalReceivers:0, totalVolunteer:0}

    return result
}


export const statisticService={
    getStatisticHandler
}