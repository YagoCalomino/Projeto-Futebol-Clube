import mapStatusHTTP from '../utils/mapStatusHTTP'; // Mapeia os códigos de status HTTP para mensagens amigáveis
import { ITeamModel } from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel'; // Modelo para interagir com a tabela de times no banco de dados

export default class TeamService {
  private teamModel: ITeamModel;

  constructor() {
    this.teamModel = new TeamModel(); // Injeção de dependência para o modelo de times
  }

  public findAllTeams = async () => {
    try {
      const allTeams = await this.teamModel.findAll(); // Busca todos os times
      return { status: 200, data: allTeams };
    } catch (error) {
      return { status: 500, data: error }; // Retorna erro se houver algum problema
    }
  };

  public findTeamById = async (id: number) => {
    try {
      const team = await this.teamModel.findById(id); // Busca time pelo id
      if (!team) return { status: mapStatusHTTP.notFound, data: { message: 'Team not found' } }; // Retorna mensagem de erro se o time não for encontrado
      return { status: mapStatusHTTP.successful, data: team };
    } catch (error) {
      return { status: 500, data: error }; // Retorna erro se houver algum problema
    }
  };
}
