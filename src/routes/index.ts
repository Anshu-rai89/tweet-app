import { Router } from "express";
import { verifyToken } from "../utils/authToken";
import userApi from './user';
import tweetApi from './tweet'
const router = Router();
router.use('/user', userApi);
router.use('/tweet', verifyToken, tweetApi);

export default router