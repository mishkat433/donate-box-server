import express from 'express';
import { donnerController } from './bloodDonner.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bloodDonnerZodValidation } from './bloodDonner.validation';


const router = express.Router();

router.get("/", donnerController.getAllDonner);

router.post("/create-donner", validateRequest(bloodDonnerZodValidation.crateBloodDonnerZodSchema), donnerController.createBloodDonner);



export const bloodDonnerRouter = router;