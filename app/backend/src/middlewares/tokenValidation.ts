// Importando os módulos necessários do express e jwt
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// Definindo a interface para as informações do usuário
interface userInfo {
  id: number;
  email: string;
  username: string;
  role: string;
}

// Definindo a função de validação do token
function tokenValidation(req: Request, res: Response, next: NextFunction) {
  // Extraindo o token do cabeçalho da requisição
  const token = req.headers.authorization;
  // Verificando se o token foi fornecido
  if (!token) return res.status(401).json({ message: 'Token not found' });

  // Definindo a função para verificar o token
  const tokenCheck = (tokenString: string): userInfo => {
    // Verificando o token e extraindo os dados do usuário
    const data = jwt.verify(
      tokenString,
      process.env.JWT_SECRET as string,
    ) as userInfo;
    return data;
  };

  try {
    // Extraindo o token do bearer
    const jwtBearer = token.split(' ')[1];
    // Verificando o token e extraindo os dados do usuário
    const userData = tokenCheck(jwtBearer);
    // Se a requisição for GET, adiciona os dados do usuário ao corpo da requisição
    if (req.method === 'GET') req.body = userData;
    // Passa para o próximo middleware
    next();
  } catch (error) {
    // Se ocorrer um erro, retorna uma mensagem de erro
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

// Exportando a função de validação do token
export default tokenValidation;
