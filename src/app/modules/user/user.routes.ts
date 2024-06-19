
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';

const router = express.Router();

router.get("/get-user", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), userController.getAllUsers);

router.post("/user-exist", userController.userExistHandler);

router.patch("/update-password/:id", validateRequest(userZodValidation.updatePasswordZodSchema), userController.passwordUpdateHandler);

router.patch("/user-banned/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), userController.userBandHandle);

router.get("/get-single-user/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), userController.getSingleUser);

router.post("/create-user", validateRequest(userZodValidation.crateUserZodSchema), userController.createUserHandler);

router.patch("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), validateRequest(userZodValidation.updateUserZodSchema), userController.updateUser);

router.delete("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER), userController.deleteUser);



export const userRoutes = router;