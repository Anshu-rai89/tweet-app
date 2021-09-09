import { Router } from "express";
import auth from "../middlewares/auth";
import userApi from './user';
import tweetApi from './tweet'
const router = Router();
router.use('/user', userApi);
router.use('/tweet', auth, tweetApi);

export default router