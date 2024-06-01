"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodDonnerRouter = void 0;
const express_1 = __importDefault(require("express"));
const bloodDonner_controller_1 = require("./bloodDonner.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bloodDonner_validation_1 = require("./bloodDonner.validation");
const router = express_1.default.Router();
router.get("/", bloodDonner_controller_1.donnerController.getAllDonner);
router.post("/create-donner", (0, validateRequest_1.default)(bloodDonner_validation_1.bloodDonnerZodValidation.crateBloodDonnerZodSchema), bloodDonner_controller_1.donnerController.createBloodDonner);
exports.bloodDonnerRouter = router;
