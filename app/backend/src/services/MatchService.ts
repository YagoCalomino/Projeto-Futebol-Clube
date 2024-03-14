import { newIMatch } from '../Interfaces/matches/IMatch';
import mapStatusHTTP from '../utils/mapStatusHTTP'; // Mapeia os códigos de status HTTP para mensagens amigáveis
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel'; // Modelo para interagir com a tabela de partidas no banco de dados

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(), // Injeção de dependência para o modelo de partida
  ) {}

  public async getAllMatches(query: string | undefined) {
    const allMatches = await this.matchModel.findAll(query); // Busca todas as partidas
    return { status: mapStatusHTTP.successful, data: allMatches };
  }

  public async getFilteredMatches(q: string | undefined) {
    const filterMatches = await this.matchModel.findAll(q); // Busca partidas filtradas
    return { status: mapStatusHTTP.successful, data: filterMatches };
  }

  public async toogleMatchInProgress(id: number) {
    await this.matchModel.updateMatch(id); // Atualiza o status da partida
    return { status: mapStatusHTTP.successful, data: { message: 'Finished' } };
  }

  public async updateScoreMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchModel.updateScore(id, homeTeamGoals, awayTeamGoals); // Atualiza a pontuação da partida
    const updateMatch = await this.matchModel.findById(id);
    return { status: mapStatusHTTP.successful, data: { message: updateMatch } };
  }

  public async createMatch(data: newIMatch) {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: mapStatusHTTP.invalidValue,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.matchModel.findById(homeTeamId);
    const awayTeam = await this.matchModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: mapStatusHTTP.notFound,
        data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(data); // Cria uma nova partida
    return { status: mapStatusHTTP.created, data: newMatch };
  }
}
