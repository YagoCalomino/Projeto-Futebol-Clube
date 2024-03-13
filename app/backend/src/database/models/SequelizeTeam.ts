import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model } from 'sequelize';
import db from '.';
import { IMatch } from '../../Interfaces/matches/IMatch';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;

  declare homeTeam?: IMatch[];

  declare awayTeam?: IMatch[];
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default SequelizeTeam;
