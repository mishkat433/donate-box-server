"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const userEnums_1 = require("../../../enums/userEnums");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(userEnums_1.USER_ROLE.admin), user_controller_1.userController.getAllUsersHandler);
router.get('/my-profile', (0, auth_1.default)(userEnums_1.USER_ROLE.buyer, userEnums_1.USER_ROLE.seller), user_controller_1.userController.getMyProfileHandler);
router.post('/signUp', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodValidation), user_controller_1.userController.createUserHandler);
router.patch('/updateUser/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.admin, userEnums_1.USER_ROLE.buyer, userEnums_1.USER_ROLE.seller), user_controller_1.userController.updateUserHandler);
router.delete('/deleteUser/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.admin, userEnums_1.USER_ROLE.buyer, userEnums_1.USER_ROLE.seller), user_controller_1.userController.deleteUserHandle);
router.get('/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.admin), user_controller_1.userController.getSingleUserHandler);
exports.UserRoutes = router;