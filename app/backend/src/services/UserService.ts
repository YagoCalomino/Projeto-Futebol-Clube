import * as bcrypt from 'bcryptjs'; // Biblioteca para criptografia de senhas
import { ILogin } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel'; // Modelo para interagir com a tabela de usuários no banco de dados
import JWT from '../utils/JWT'; // Utilitário para lidar com tokens JWT
import mapStatusHTTP from '../utils/mapStatusHTTP'; // Mapeia os códigos de status HTTP para mensagens amigáveis

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(), // Injeção de dependência para o modelo de usuário
    private jwtService = JWT, // Injeção de dependência para o serviço JWT
  ) {}

  public async login(data: ILogin) {
    const loginUser = await this.userModel.findByEmail(data.email); // Busca usuário pelo email
    if (loginUser) {
      if (!bcrypt.compareSync(data.password, loginUser.password)) { // Compara a senha fornecida com a senha criptografada do usuário
        return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' },
        };
      }
      const token = this.jwtService.sing({ id: loginUser.id, email: loginUser.email }); // Gera um token JWT para o usuário
      return { status: mapStatusHTTP.successful, data: { token } };
    }
    return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' } }; // Retorna mensagem de erro se o email ou a senha forem inválidos
  }

  public async getUserByRole(id: number) {
    const user = await this.userModel.findById(id); // Busca usuário pelo id
    if (!user) {
      return { status: mapStatusHTTP.notFound, data: { message: 'User not found' } }; // Retorna mensagem de erro se o usuário não for encontrado
    }
    return { status: mapStatusHTTP.successful, data: user };
  }
}
