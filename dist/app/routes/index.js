"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const banner_routes_1 = require("../modules/banner/banner.routes");
const bloodDonner_routes_1 = require("../modules/bloodDonner/bloodDonner.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/admin',
        route: admin_routes_1.adminRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/bloodDonner',
        route: bloodDonner_routes_1.bloodDonnerRouter,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/banner',
        route: banner_routes_1.bannerRoutes,
    }
];
moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
exports.default = router;
