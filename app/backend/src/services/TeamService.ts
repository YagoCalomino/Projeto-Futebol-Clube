import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ITeamModel } from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  private teamModel: ITeamModel;

  constructor() {
    this.teamModel = new TeamModel();
  }

  public findAllTeams = async () => {
    try {
      const allTeams = await this.teamModel.findAll();
      return { status: 200, data: allTeams };
    } catch (error) {
      return { status: 500, data: error };
    }
  };

  public findTeamById = async (id: number) => {
    try {
      const team = await this.teamModel.findById(id);
      if (!team) return { status: mapStatusHTTP.notFound, data: { message: 'Team not found' } };
      return { status: mapStatusHTTP.successful, data: team };
    } catch (error) {
      return { status: 500, data: error };
    }
  };
}
