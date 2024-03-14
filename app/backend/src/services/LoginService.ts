import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/userModel';

interface Response {
  status: number;
  response: { message: string } | { token: string };
}

interface userInfoToken {
  id: number;
  email: string;
  username: string;
  role: string;
  password: string;
}

class LoginService {
  private static createToken(userInfoToken: userInfoToken): string {
    const { password, ...userInfo } = userInfoToken;
    const token = jwt.sign(userInfo, process.env.JWT_SECRET as string);
    return token;
  }

  static login = async (email: string, password: string): Promise<Response> => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: 401, response: { message: 'Invalid email or password' } };
    }
    const comparation = await bcrypt.compare(password, user.password);
    if (!comparation) {
      return { status: 401, response: { message: 'Invalid email or password' } };
    }
    const result = LoginService.createToken(user.dataValues);
    return { status: 200, response: { token: result } };
  };

  static getRole = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return { status: 200, response: { role: user?.role } };
  };
}

export default LoginService;
