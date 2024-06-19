import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';


const router = express.Router();

router.post("/login", validateRequest(authValidation.loginAdminZodValidation), authController.loginHandle);

router.post("/logout",  authController.handleLogOut);

router.get("/get-single-user/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),  authController.handleLoginUserData);

router.post('/refresh-token', validateRequest(authValidation.refreshTokenZodValidation), authController.refreshToken);


export const authRoutes = router;