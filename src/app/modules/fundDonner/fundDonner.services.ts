
import { IFundDonate } from "./fundDonner.interface";

import { sslPaymentService } from "../sslPayment/ssl.service";

const initPayment = async (payload: IFundDonate): Promise<any> => {


    const sslSession = sslPaymentService.initPayment(payload)
    return sslSession
}

export const fundDonnerServices = {
    initPayment
}
