import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginValidations from '../middlewares/LoginValidations';

const userController = new UserController();

const router = Router();

router.post('/', LoginValidations
  .validateLogin, (req, res) => userController.login(req, res));

export default router;