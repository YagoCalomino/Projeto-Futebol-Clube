import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class LoginValidations {
  static async validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(mapStatusHTTP.badRequest)
        .send({ message: 'All fields must be filled' });
    }

    if (!(typeof email === 'string' && typeof password === 'string')) {
      return res.status(400).send({ message: 'Email and password must be strings' });
    }

    const emailRegex = new RegExp('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$');

    if (password.length < 6 || !emailRegex.test(email)) {
      return res
        .status(mapStatusHTTP.unauthorized)
        .send({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default LoginValidations;
