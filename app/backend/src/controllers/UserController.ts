import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);
    return res.status(status).json(data);
  }

  public async getUserByRole(_req: Request, res: Response) {
    const { id } = res.locals.payload;
    const { status, data } = await this.userService.getUserByRole(id);
    return res.status(status).json(data);
  }
}
