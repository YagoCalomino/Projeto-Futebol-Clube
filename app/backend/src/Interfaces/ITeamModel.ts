import { ITeam } from './ITeams';

export interface ITeamModel {
  findAll: () => Promise<ITeam[]>;
  findById: (id: number) => Promise<ITeam | null>;
}
