import express from 'express';
import { bannerController } from './banner.controllser';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';



const router = express.Router();

router.get("/", bannerController.getAllBanner);

router.post('/create-banner', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), bannerController.createBanner);

router.patch('/:id', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), bannerController.updateBanner);

router.delete('/:id', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), bannerController.deleteBanner);


export const bannerRoutes = router;