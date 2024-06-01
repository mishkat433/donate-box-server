"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const banner_controllser_1 = require("./banner.controllser");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.get("/", banner_controllser_1.bannerController.getAllBanner);
router.post('/create-banner', (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.ADMIN), banner_controllser_1.bannerController.createBanner);
router.patch('/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.ADMIN), banner_controllser_1.bannerController.updateBanner);
router.delete('/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.SUPER_ADMIN, userEnums_1.USER_ROLE.ADMIN), banner_controllser_1.bannerController.deleteBanner);
exports.bannerRoutes = router;
