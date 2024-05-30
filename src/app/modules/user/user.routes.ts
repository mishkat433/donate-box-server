
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';

const router = express.Router();

router.get("/", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), userController.getAllUsers);

router.get("/donner", userController.getAllDonner);

router.get("/", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), userController.getAllUsers);

router.get("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), userController.getSingleUser);

router.post("/create-user", validateRequest(userZodValidation.crateUserZodSchema), userController.createUserHandler);

router.patch("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), validateRequest(userZodValidation.updateUserZodSchema), userController.updateUser);

router.delete("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), userController.deleteUser);


export const userRoutes = router;