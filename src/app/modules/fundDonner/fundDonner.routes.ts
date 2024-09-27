
import express from 'express';
import { fundDonnerController } from './fundDonner.controller';

const router = express.Router();

router.post("/init-payment", fundDonnerController.initPaymentHandler);


export const fundDonnerRoutes = router;