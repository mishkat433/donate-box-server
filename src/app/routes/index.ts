import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { bannerRoutes } from "../modules/banner/banner.routes";
import { bloodDonnerRouter } from "../modules/bloodDonner/bloodDonner.routes";



const router = express.Router();

const moduleRoutes = [
    {
        path: '/admin',
        route: adminRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/bloodDonner',
        route: bloodDonnerRouter,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/banner',
        route: bannerRoutes,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



