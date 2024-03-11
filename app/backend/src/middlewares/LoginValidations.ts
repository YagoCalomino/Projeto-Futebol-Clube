import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class LoginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(mapStatusHTTP.badRequest).json({ message: 'All fields must be filled' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password must be strings' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (password.length < 6 || !emailRegex.test(email)) {
      return res.status(mapStatusHTTP.unauthorized).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const bToken = req.headers.authorization;

    if (!bToken) {
      return res.status(mapStatusHTTP.unauthorized).json({ message: 'Token not found' });
    }
    const token = bToken.split(' ')[1];
    const validToken = await JWT.verify(token);

    if (validToken === 'Token must be a valid token') {
      return res.status(mapStatusHTTP.unauthorized).json({ message: validToken });
    }
    res.locals.payload = validToken;
    next();
  }
}
