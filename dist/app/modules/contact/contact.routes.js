"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.ADMIN), contact_controller_1.contactController.getAllContactMessage);
router.post("/create-contact-message", contact_controller_1.contactController.createContact);
router.patch("/update-contact-message/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.ADMIN), contact_controller_1.contactController.updateContactMessage);
router.delete("/delete-contact-message/:id", (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN), contact_controller_1.contactController.deleteContactMessage);
exports.contactRoutes = router;
