import Teams from '../database/models/teamsModel';

class TeamsService {
  static async getAll(): Promise<Teams[]> {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getById(id: string): Promise<Teams | null> {
    const team = await Teams.findByPk(id);
    return team;
  }
}

export default TeamsService;
