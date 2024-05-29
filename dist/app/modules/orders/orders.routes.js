"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(userEnums_1.USER_ROLE.admin), orders_controller_1.orderController.getOrderHandler);
router.get('/my-order/:id', (0, auth_1.default)(userEnums_1.USER_ROLE.buyer, userEnums_1.USER_ROLE.admin, userEnums_1.USER_ROLE.seller), orders_controller_1.orderController.getMyOrderHandler);
// router.get('/:id', cowsController.getSingleCowsHandler);
router.post('/create-order', (0, validateRequest_1.default)(order_validation_1.orderValidation.createOrderValidation), (0, auth_1.default)(userEnums_1.USER_ROLE.buyer, userEnums_1.USER_ROLE.admin), orders_controller_1.orderController.createOrderHandler);
exports.orderRouter = router;
