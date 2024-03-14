// Importando os módulos necessários do express
import { NextFunction, Request, Response } from 'express';

// Definindo a função de validação de email e senha
function emailPasswordValidations(req: Request, res: Response, next: NextFunction) {
  // Extraindo email e senha do corpo da requisição
  const { email, password } = req.body;

  // Definindo a expressão regular para validar o formato do email
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Verificando se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  // Verificando se o email é válido
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password',
    });
  }
  // Verificando se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password',
    });
  }
  // Se tudo estiver ok, passa para o próximo middleware
  return next();
}

// Exportando a função de validação
export default emailPasswordValidations;
