import { IUser } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbUser = await this.user.findOne({ where: { email } });
    return dbUser ? dbUser.get() : null;
  }
}