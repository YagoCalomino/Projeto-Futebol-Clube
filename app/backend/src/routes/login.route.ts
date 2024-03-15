import { Request, Response, Router } from 'express';
import Login from '../Controller/LoginController';
import emailPasswordValidations from '../middlewares/emailPasswordValidations';
import tokenValidation from '../middlewares/tokenValidation';

const login = Router();

login.post('/login', emailPasswordValidations, (req: Request, res: Response) =>
  Login.login(req, res));

login.get('/login/role', tokenValidation, Login.getRole);

export default login;
