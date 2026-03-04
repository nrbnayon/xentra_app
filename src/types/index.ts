export interface SportCategory {
  id: string;
  name: string;
  icon: string;
}

export interface MatchTeam {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface League {
  id: string;
  name: string;
}

export interface MatchCompetition {
  id: string;
  title: string;
  status: "latest" | "upcoming" | "completed";
  sportId: string;
  leagueId: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  entryFee: number;
  prizePool: number;
  dateTime: string;
  backgroundImage: string;
}

export interface UserPrediction {
  id: string;
  matchId: string;
  teamAScore: number;
  teamBScore: number;
  timestamp: string;
}
