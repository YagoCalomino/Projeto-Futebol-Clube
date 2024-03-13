import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard();
    return res.status(status).json(data);
  }
}
