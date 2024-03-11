import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);

export default router;
