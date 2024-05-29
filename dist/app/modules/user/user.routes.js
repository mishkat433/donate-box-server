"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN), user_controller_1.userController.getAllUsers);
router.get("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.USER), user_controller_1.userController.getSingleUser);
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.userZodValidation.crateUserZodSchema), user_controller_1.userController.createUserHandler);
router.patch("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.USER), (0, validateRequest_1.default)(user_validation_1.userZodValidation.updateUserZodSchema), user_controller_1.userController.updateUser);
router.delete("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.USER), user_controller_1.userController.deleteUser);
exports.userRoutes = router;