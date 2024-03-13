import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';
import matchRouter from './matchRouter';
import leaderboardRouter from './leaderboardRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
