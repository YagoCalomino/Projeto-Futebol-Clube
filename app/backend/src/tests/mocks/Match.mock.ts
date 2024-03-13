const matches = [
    {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      }
]

const matchesInProgress = [
    {
        "id": 3,
        "homeTeamId": 6,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Fluminense"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Vasco"
        }
      }
]

export {
  matches,
  matchesInProgress
}