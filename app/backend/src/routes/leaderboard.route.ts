// Importando as dependências necessárias
import { Request, Response, Router } from 'express';
import LeaderboardController from '../Controller/LeaderboardController';

// Inicializando o roteador
const leaderboard = Router();

// Rota para obter as partidas em casa
leaderboard.get(
  '/leaderboard/home',
  // "homeMatches" é um método no controlador do leaderboard
  (req: Request, res: Response) => LeaderboardController.homeMatches(req, res),
);

// Rota para obter as partidas fora de casa
leaderboard.get(
  '/leaderboard/away',
  // "awayMatches" é um método no controlador do leaderboard
  (req: Request, res: Response) => LeaderboardController.awayMatches(req, res),
);

// Rota para obter todas as partidas
leaderboard.get(
  '/leaderboard',
  // "allMatches" é um método no controlador do leaderboard
  (req: Request, res: Response) => LeaderboardController.allMatches(req, res),
);

// Exportando o roteador
export default leaderboard;
