import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(data: ILogin) {
    const loginUser = await this.userModel.findByEmail(data.email);
    if (loginUser) {
      if (!bcrypt.compareSync(data.password, loginUser.password)) {
        return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' },
        };
      }
      const token = this.jwtService.sing({ id: loginUser.id, email: loginUser.email });
      return { status: mapStatusHTTP.successful, data: { token } };
    }
    return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' } };
  }
}