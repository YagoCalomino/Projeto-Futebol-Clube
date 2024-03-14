import Matches from '../database/models/matches';
import Teams from '../database/models/teamsModel';

interface MatchInfo {
  id?: number
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface resultInfo {
  t: string;
  p: number;
  j: number;
  v: number;
  d: number;
  l: number;
  gp: number;
  gc: number;
  sg: number;
  pc: string;

}

class LbService {
  static async getTeams() {
    const teams = await Teams.findAll();
    return teams.map((team) => team.dataValues);
  }

  static async getMatches() {
    const findMatchesDataValues = await Matches.findAll();
    const findMatches = findMatchesDataValues.map((match) => match.dataValues);
    const finishedMatches = findMatches.filter(
      (match) => match.inProgress === false,
    );
    return finishedMatches;
  }

  static homeVictory = (matches: MatchInfo[]) => {
    let victories = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  };

  static awayVictory = (matches: MatchInfo[]) => {
    let victories = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  };

  static draw = (matches: MatchInfo[]) => {
    let draws = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  };

  static goalsFavor = (matches: MatchInfo[]) => {
    let goalsFavor = 0;
    matches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
    });
    return goalsFavor;
  };

  static goalsOwn = (matches: MatchInfo[]) => {
    let goalsOwn = 0;
    matches.forEach((match) => {
      goalsOwn += match.awayTeamGoals;
    });
    return goalsOwn;
  };

  static async constHome() {
    const finishedMatches = await LbService.getMatches();
    const teams = await LbService.getTeams();
    const result: resultInfo[] = teams.map((team) => {
      const matches = finishedMatches.filter((match) => match.homeTeamId === team.id);
      const t = team.teamName;
      const p = LbService.homeVictory(matches) * 3 + LbService.draw(matches);
      const j = matches.length;
      const v = LbService.homeVictory(matches);
      const d = LbService.draw(matches);
      const l = matches.length - LbService.homeVictory(matches)
        - LbService.draw(matches);
      const gp = LbService.goalsFavor(matches);
      const gc = LbService.goalsOwn(matches);
      const sg = LbService.goalsFavor(matches) - LbService.goalsOwn(matches);
      const pc = ((p / (matches.length * 3)) * 100).toFixed(2);
      return { t, p, j, v, d, l, gp, gc, sg, pc };
    });
    return result;
  }

  static async constAway() {
    const finishedMatches = await LbService.getMatches();
    const teams = await LbService.getTeams();
    const result: resultInfo[] = teams.map((team) => {
      const matches = finishedMatches.filter((match) => match.awayTeamId === team.id);
      const t = team.teamName;
      const p = LbService.awayVictory(matches) * 3 + LbService.draw(matches);
      const j = matches.length;
      const v = LbService.awayVictory(matches);
      const d = LbService.draw(matches);
      const l = matches.length - LbService.awayVictory(matches)
        - LbService.draw(matches);
      const gp = LbService.goalsOwn(matches);
      const gc = LbService.goalsFavor(matches);
      const sg = LbService.goalsOwn(matches) - LbService.goalsFavor(matches);
      const pc = ((p / (matches.length * 3)) * 100).toFixed(2);
      return { t, p, j, v, d, l, gp, gc, sg, pc };
    });
    return result;
  }

  static async constAllTeams() {
    const homeResult = await LbService.constHome();
    const awayResult = await LbService.constAway();
    return homeResult.map((homeMatches) => {
      const away = awayResult.find((awayMatches) => awayMatches.t === homeMatches.t)
      || { t: homeMatches.t, p: 0, j: 0, v: 0, d: 0, l: 0, gp: 0, gc: 0, sg: 0, pc: '0.00' };

      const { t, p = 0, j = 0, v = 0, d = 0, l = 0, gp = 0, gc = 0, sg = 0 } = homeMatches;

      return { t,
        p: p + away.p,
        j: j + away.j,
        v: v + away.v,
        d: d + away.d,
        l: l + away.l,
        gp: gp + away.gp,
        gc: gc + away.gc,
        sg: sg + away.sg,
        pc: (((p + away.p) / ((j + away.j) * 3)) * 100).toFixed(2),
      };
    });
  }

  static async infoTeams(result: resultInfo[]) {
    const teamsInfo = result.map((teamResult) => ({
      name: teamResult.t,
      totalPoints: teamResult.p,
      totalGames: teamResult.j,
      totalVictories: teamResult.v,
      totalDraws: teamResult.d,
      totalLosses: teamResult.l,
      goalsFavor: teamResult.gp,
      goalsOwn: teamResult.gc,
      goalsBalance: teamResult.sg,
      efficiency: parseFloat(teamResult.pc),
    }));

    return teamsInfo;
  }

  static async infoHomeTeam() {
    const resultHome = await LbService.constHome();
    return LbService.infoTeams(resultHome);
  }

  static async infoAwayTeam() {
    const resultAway = await LbService.constAway();
    return LbService.infoTeams(resultAway);
  }

  static async infoAllTeam() {
    const resultAll = await LbService.constAllTeams();
    return LbService.infoTeams(resultAll);
  }

  static async sortedHomeTeams() {
    const sorted = await LbService.infoHomeTeam();
    sorted.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return sorted;
  }

  static async sortedAwayTeams() {
    const sorted = await LbService.infoAwayTeam();
    sorted.sort((c, d) => {
      if (c.totalPoints !== d.totalPoints) {
        return d.totalPoints - c.totalPoints;
      }
      if (c.totalVictories !== d.totalVictories) {
        return d.totalVictories - c.totalVictories;
      }
      if (c.goalsBalance !== d.goalsBalance) {
        return d.goalsBalance - c.goalsBalance;
      }
      return d.goalsFavor - c.goalsFavor;
    });
    return sorted;
  }

  static async sortedAllTeams() {
    const sorted = await LbService.infoAllTeam();
    sorted.sort((e, f) => {
      if (e.totalPoints !== f.totalPoints) {
        return f.totalPoints - e.totalPoints;
      }
      if (e.totalVictories !== f.totalVictories) {
        return f.totalVictories - e.totalVictories;
      }
      if (e.goalsBalance !== f.goalsBalance) {
        return f.goalsBalance - e.goalsBalance;
      }
      return f.goalsFavor - e.goalsFavor;
    });
    return sorted;
  }
}

export default LbService;
