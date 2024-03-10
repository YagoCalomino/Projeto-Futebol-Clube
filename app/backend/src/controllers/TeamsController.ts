import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAllTeams = async (_req: Request, res: Response) => {
    try {
      const serviceResponse = await this.teamService.findAllTeams();
      res.status(serviceResponse.status).json(serviceResponse.data);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public getTeamById = async (_req: Request, res: Response) => {
    try {
      const { id } = _req.params;
      const serviceResponse = await this.teamService.findTeamById(Number(id));
      return res.status(serviceResponse.status).json(serviceResponse.data);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
