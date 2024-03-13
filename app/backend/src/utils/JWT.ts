import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  static sing(payload: JwtPayload) {
    return sign({ ...payload }, this.secret);
  }

  static verify(token: string) {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
