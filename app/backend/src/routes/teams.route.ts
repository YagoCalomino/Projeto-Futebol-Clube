// Importando as dependências necessárias
import { Request, Response, Router } from 'express';
import Teams from '../Controller/TeamsController';

// Inicializando o roteador
const teams = Router();

// Rota para obter todos os times
teams.get('/', (req: Request, res: Response) => Teams.getAll(req, res));

// Rota para obter um time específico pelo ID
teams.get('/:id', (req: Request, res: Response) => Teams.getById(req, res));

// Exportando o roteador
export default teams;
