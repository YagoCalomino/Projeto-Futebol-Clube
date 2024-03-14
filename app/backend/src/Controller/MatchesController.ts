import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const matches = await MatchesService.getAll();
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const inProgressMatches = matches.filter((match) => match.inProgress);
      return res.status(200).json(inProgressMatches);
    }
    if (inProgress === 'false') {
      const finishedMatches = matches.filter((match) => !match.inProgress);
      return res.status(200).json(finishedMatches);
    }

    return res.status(200).json(matches);
  }

  static async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { status, response } = await MatchesService.finishMatch(Number(id));
    return res.status(status).json(response);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, response } = await MatchesService.updateMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(status).json(response);
  }

  static async createMatch(req: Request, res: Response) {
    const matches = req.body;

    const { status, response } = await MatchesService.createMatch(matches);
    return res.status(status).json(response);
  }
}

export default MatchesController;
