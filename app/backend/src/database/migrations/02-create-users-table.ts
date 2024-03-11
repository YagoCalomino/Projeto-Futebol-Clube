import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IUser } from '../../Interfaces/users/IUsers';

const UserSchema: Record<keyof IUser, any> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Model<IUser>>('users', UserSchema);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  },
};
