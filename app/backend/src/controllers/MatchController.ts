import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, data } = await this.matchService
      .getAllMatches(inProgress as string | undefined);
    return res.status(status).json(data);
  };

  public toogleMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService
      .toogleMatchInProgress(Number(id));
    return res.status(status).json(data);
  };

  public updateScoreMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.updateScoreMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(status).json(data);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { status, data } = await
    this.matchService.createMatch(req.body);
    return res.status(status).json(data);
  };
}
