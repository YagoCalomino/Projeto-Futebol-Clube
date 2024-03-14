import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async homeMatches(req: Request, res: Response) {
    const matches = await LeaderboardService.sortedHomeTeams();
    return res.status(200).json(matches);
  }

  static async awayMatches(req: Request, res: Response) {
    const matches = await LeaderboardService.sortedAwayTeams();
    return res.status(200).json(matches);
  }

  static async allMatches(req: Request, res: Response) {
    const matches = await LeaderboardService.sortedAllTeams();
    return res.status(200).json(matches);
  }
}

export default LeaderboardController;
