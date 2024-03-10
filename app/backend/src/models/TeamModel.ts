import { ITeam } from '../Interfaces/ITeams';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private teams = SequelizeTeam;

  async findAll() {
    const dbTeams = await this.teams.findAll();
    return dbTeams;
  }

  async findById(id: ITeam['id']) {
    const dbTeam = await this.teams.findByPk(id);
    if (dbTeam === null) return null;
    return dbTeam;
  }
}
