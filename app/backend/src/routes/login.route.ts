import { Request, Response, Router } from 'express';
import Login from '../Controller/LoginController';
import emailPasswordValidations from '../middlewares/emailPasswordValidations'; //Teste de Importação, erro ao puxar
import tokenValidation from '../middlewares/tokenValidation';

const login = Router();

login.post('/login', emailPasswordValidations, (req: Request, res: Response) =>
  Login.login(req, res));

login.get('/login/role', tokenValidation, Login.getRole); // teste de rota, mudar

export default login;