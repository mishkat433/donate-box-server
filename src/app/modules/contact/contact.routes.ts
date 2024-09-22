
import express from 'express';
import { contactController } from './contact.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';


const router = express.Router();

router.get("/", auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), contactController.getAllContactMessage);

router.post("/create-contact-message", contactController.createContact);

router.patch("/update-contact-message/:id", auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), contactController.updateContactMessage);

router.delete("/delete-contact-message/:id", auth(USER_ROLE.SUPER_ADMIN), contactController.deleteContactMessage);


export const contactRoutes = router;