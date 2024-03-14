import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { response, status } = await LoginService.login(email, password);
    return res.status(status).json(response);
  }

  static async getRole(req: Request, res: Response) {
    const { email } = req.body;
    // req.body.user = userData;
    const result = await LoginService.getRole(email);
    return res.status(result.status).json(result.response);
  }
}

export default LoginController;
