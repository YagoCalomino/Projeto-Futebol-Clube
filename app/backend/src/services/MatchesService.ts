import Matches from '../database/models/matches';
import Teams from '../database/models/teamsModel';

interface MatchesInfo {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface MatchesCreation {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;

}

class MatchesService {
  static async getAll(): Promise<MatchesInfo[]> {
    const matches = await Matches.findAll(
      { include:
        [
          { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      },
    );
    return matches;
  }

  static async finishMatch(id: number) {
    const match = await Matches.findByPk(id);
    if (!match) {
      return { status: 404, response: { message: 'Match not found' } };
    }
    match.dataValues.inProgress = false;
    await Matches.update(match.dataValues, { where: { id } });
    return { status: 200, response: { message: 'Finished' } };
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await Matches.findByPk(id);

    if (!match) {
      return { status: 404, response: { message: 'Match not found' } };
    }

    match.dataValues.homeTeamGoals = homeTeamGoals;
    match.dataValues.awayTeamGoals = awayTeamGoals;

    await Matches.update(match.dataValues, { where: { id } });
    return { status: 200, response: { message: 'Updated' } };
  }

  static async createMatch(matches: MatchesCreation) {
    const homeTeam = await Teams.findByPk(matches.homeTeamId);
    const awayTeam = await Teams.findByPk(matches.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return {
        status: 404,
        response: { message: 'There is no team with such id!' },
      };
    }
    if (homeTeam.id === awayTeam.id) {
      return {
        status: 422,
        response: {
          message: 'It is not possible to create a match with two equal teams',
        } };
    }
    const match = await Matches
      .create({ ...matches, inProgress: true });
    return { status: 201, response: match };
  }
}
export default MatchesService;
