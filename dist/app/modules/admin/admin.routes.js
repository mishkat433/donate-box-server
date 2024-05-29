"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN), admin_controller_1.adminController.getAllAdmins);
router.get("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN), admin_controller_1.adminController.getSingleUser);
router.post("/create-user", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminZodValidation.createAdminZodSchema), admin_controller_1.adminController.createAdminHandler);
router.patch("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.ADMIN, userEnums_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminZodValidation.updateAdminZodSchema), admin_controller_1.adminController.updateUser);
router.delete("/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN), admin_controller_1.adminController.deleteUser);
exports.adminRoutes = router;
