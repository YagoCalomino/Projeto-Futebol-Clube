import { Router } from 'express';
import teams from './teams.route';
import login from './login.route';
import matches from './matches.route';
import leaderboard from './leaderboard.route';

const router = Router();

router.use('/teams', teams);
router.use('/teams:id', teams);
router.use('/', login);
router.use('/matches', matches);
router.use('/', leaderboard);

export default router;
