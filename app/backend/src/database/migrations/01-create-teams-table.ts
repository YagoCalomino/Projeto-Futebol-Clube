import { DataTypes, Model, QueryInterface } from 'sequelize';
import { ITeams } from '../../Interfaces/ITeams';

const TeamsTable = {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeams>>('teams', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'team_name',
        },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams')
  }
}

export default TeamsTable;
