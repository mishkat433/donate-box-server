"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginAdminZodValidation), auth_controller_1.authController.loginHandle);
router.post("/logout", auth_controller_1.authController.handleLogOut);
router.get("/get-single-user/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.USER), auth_controller_1.authController.handleLoginUserData);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenZodValidation), auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
