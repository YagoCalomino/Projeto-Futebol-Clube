import { Request, Response } from 'express';
import teamsService from '../services/TeamsService';

class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await teamsService.getAll();
    return res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await teamsService.getById(id);
    return res.status(200).json(team);
  }
}

export default TeamController;
