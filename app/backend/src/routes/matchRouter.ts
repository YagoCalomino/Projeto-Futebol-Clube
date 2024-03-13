import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidations from '../middlewares/LoginValidations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  LoginValidations.validateToken,
  (req, res) => matchController.toogleMatchInProgress(req, res),
);

router.patch(
  '/:id',
  LoginValidations.validateToken,
  (req, res) => matchController.updateScoreMatch(req, res),
);

router.post(
  '/',
  LoginValidations.validateToken,
  (req, res) => matchController.createMatch(req, res),
);

export default router;
