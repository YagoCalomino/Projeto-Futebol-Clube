import { IUser } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;

  async findByEmail(email: IUser['email']) {
    const dbUser = await this.user.findOne({ where: { email } });
    return dbUser ? dbUser.get() : null;
  }

  async findById(id: IUser['id']) {
    const dbUser = await this.user.findByPk(id);
    return dbUser ? dbUser.get() : null;
  }
}