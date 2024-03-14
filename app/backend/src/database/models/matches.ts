// Importando os módulos necessários do sequelize
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';

// Importando o módulo de banco de dados e o modelo de equipes
import db from '.';
import Teams from './teamsModel';

// Definindo a classe Matches que estende o Model do sequelize
class Matches extends Model<
InferAttributes<Matches>,
InferCreationAttributes<Matches>
> {
  // Declarando as propriedades do modelo
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

// Inicializando o modelo Matches com suas propriedades e configurações
Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db, // Conexão com o banco de dados
  modelName: 'Matches', // Nome do modelo
  tableName: 'matches', // Nome da tabela correspondente no banco de dados
  timestamps: false, // Desativando os timestamps automáticos do sequelize
  underscored: true, // Utilizando o padrão underscored para os nomes das colunas
});

// Definindo as associações do modelo Matches
Matches.belongsTo(Teams, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});
Matches.belongsTo(Teams, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

// Exportando o modelo Matches
export default Matches;
