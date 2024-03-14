// Importando as dependências necessárias
import { Request, Response, Router } from 'express';
import Matches from '../Controller/MatchesController';
import tokenValidation from '../middlewares/tokenValidation';

// Inicializando o roteador
const matches = Router();

// Rota para obter todas as partidas
matches.get('/', (req: Request, res: Response) => Matches.getAllMatches(req, res));

// Rota para finalizar uma partida
// "tokenValidation" é um middleware que valida o token
matches.patch(
  '/:id/finish',
  tokenValidation,
  (req: Request, res: Response) => Matches.finishMatches(req, res),
);

// Rota para atualizar uma partida
// "tokenValidation" é um middleware que valida o token
matches.patch(
  '/:id',
  tokenValidation,
  (req: Request, res: Response) => Matches.updateMatch(req, res),
);

// Rota para criar uma nova partida
// "tokenValidation" é um middleware que valida o token
matches.post(
  '/',
  tokenValidation,
  (req: Request, res: Response) => Matches.createMatch(req, res),
);

// Exportando o roteador
export default matches;
