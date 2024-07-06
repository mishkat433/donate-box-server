
import express from 'express';
import { donateHistoryController } from './donateList.controller';


const router = express.Router();

router.get("/", donateHistoryController.getAllRequest);

router.get("/pending-request", donateHistoryController.getPendingRequest);

router.patch("/assign-donner/:id", donateHistoryController.assignDonner);

// router.get("/:id", donateHistoryController.getSingleRequest);

router.post("/create-request", donateHistoryController.NeedDonnerRequest);




export const donateHistory = router;