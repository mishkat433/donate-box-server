import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import config from "../../../config";
import axios from "axios";
import { IFundDonate } from "../fundDonner/fundDonner.interface";
import { generateTransactionId } from "./ssl.util";

const initPayment = async (payload: IFundDonate) => {
    try {
        const data = {
            store_id: config.SSL_STORE_ID,
            store_passwd: config.SSL_SECRET_KEY,
            total_amount: payload.donateAmount,
            currency: 'BDT',
            tran_id: generateTransactionId(),
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

        const response = await axios({
            method: 'post',
            url: config.SSL_PAYMENT_URL,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        return response.data;
    }
    catch (err) {
        console.error('Error during payment initialization:', err);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Payment error');
    }
}

export const sslPaymentService = {
    initPayment
}