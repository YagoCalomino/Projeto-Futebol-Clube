const teamsMatchesMock = [
    {
      id: 16,
      teamName: "São Paulo",
      homeTeam: [
        {
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 1,
          awayTeamId: 8,
          awayTeamGoals: 1,
          inProgress: false
        },
        {
          id: 28,
          homeTeamId: 16,
          homeTeamGoals: 3,
          awayTeamId: 7,
          awayTeamGoals: 0,
          inProgress: false
        }
      ],
      awayTeam: [
        {
          id: 14,
          homeTeamId: 14,
          homeTeamGoals: 2,
          awayTeamId: 16,
          awayTeamGoals: 1,
          inProgress: false
        },
        {
          id: 23,
          homeTeamId: 15,
          homeTeamGoals: 2,
          awayTeamId: 16,
          awayTeamGoals: 3,
          inProgress: false
        },
        {
          id: 33,
          homeTeamId: 1,
          homeTeamGoals: 1,
          awayTeamId: 16,
          awayTeamGoals: 1,
          inProgress: false
        }
      ]
    }
  ];

  const leaderboardMock = [
    {
      name: 'São Paulo',
      totalPoints: 4,
      totalGames: 2,
      totalVictories: 1,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 4,
      goalsOwn: 1,
      goalsBalance: 3,
      efficiency: '66.67'
    },
  ];

  export {
    teamsMatchesMock,
    leaderboardMock,
  }