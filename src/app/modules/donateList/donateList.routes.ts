
import express from 'express';
import { donateHistoryController } from './donateList.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';
import validateRequest from '../../middlewares/validateRequest';
import { requestForBloodZodValidation } from './donateList.validation';


const router = express.Router();

router.get("/", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), donateHistoryController.getAllRequest);

router.get("/my-activity/:id", auth(USER_ROLE.USER, USER_ROLE.DONNER), donateHistoryController.myActivity);

router.get("/my-request", donateHistoryController.myRequest);

router.get("/pending-request", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), donateHistoryController.getPendingRequest);

router.patch("/decide-request/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), donateHistoryController.decideRequest);

router.delete("/delete-request/:id", auth(USER_ROLE.SUPER_ADMIN), donateHistoryController.deleteRequestHandler);

router.post("/create-request", validateRequest(requestForBloodZodValidation.crateRequestZodSchema), donateHistoryController.NeedDonnerRequest);


export const donateHistory = router;