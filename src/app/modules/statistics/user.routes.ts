
import express from 'express';
import { statisticsDataController } from './statistics.controller';


const router = express.Router();

router.get("/",statisticsDataController.getAllStatisticData );




export const statisticsRoutes = router;