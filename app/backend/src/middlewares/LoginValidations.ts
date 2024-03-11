import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class AuthValidations {
  static checkLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(mapStatusHTTP.badRequest).json({ message: 'All fields must be filled' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password must be strings' });
    }

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (password.length < 6 || !emailPattern.test(email)) {
      return res.status(mapStatusHTTP.unauthorized).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(mapStatusHTTP.unauthorized).json({ message: 'Token not found' });
    }
    const token = authHeader.split(' ')[1];
    const isValidToken = await JWT.verify(token);

    if (isValidToken === 'Token must be a valid token') {
      return res.status(mapStatusHTTP.unauthorized).json({ message: isValidToken });
    }
    res.locals.payload = isValidToken;
    next();
  }
}
