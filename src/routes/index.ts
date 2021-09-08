import { Router } from "express";
import userApi from './user';
const router = Router();
router.use('/user', userApi);
export default router