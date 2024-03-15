// Importando as dependências necessárias
import { Request, Response, Router } from 'express';
import Login from '../Controller/LoginController';
import emailPasswordValidations from '../middlewares/emailPasswordValidations';
import tokenValidation from '../middlewares/tokenValidation';

// Inicializando o roteador
const login = Router();

// Rota para realizar o login
// "emailPasswordValidations" é um middleware que valida o email e a senha
login.post('/login', emailPasswordValidations, (req: Request, res: Response) =>
  // "login" é um método no controlador de login
  Login.login(req, res));

// Rota para obter a função do usuário
// "tokenValidation" é um middleware que valida o token
login.get('/login/role', tokenValidation,

// "getRole" é um método no controlador de login
Login.getRole);

// Exportando o roteador
export default login;
