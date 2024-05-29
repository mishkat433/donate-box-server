
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminZodValidation } from './admin.validation';
import { adminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';


const router = express.Router();

router.get("/", auth(USER_ROLE.SUPER_ADMIN), adminController.getAllAdmins);

router.get("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), adminController.getSingleUser);

router.post("/create-user", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), validateRequest(adminZodValidation.createAdminZodSchema), adminController.createAdminHandler);

router.patch("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), validateRequest(adminZodValidation.updateAdminZodSchema), adminController.updateUser);

router.delete("/:id", auth(USER_ROLE.SUPER_ADMIN), adminController.deleteUser);


export const adminRoutes = router;