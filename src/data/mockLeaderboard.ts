import { mockMatches } from "./mock";

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  result: "Won" | "Lose" | null;
}

// Single unified interface used by LeaderboardCard + LeaderboardDetail
export interface LeaderboardMatch {
  id: string;
  matchId: string; // The specific match ID (e.g., m1, m3)
  leagueId: string; // The league ID (e.g., l1, l2)
  title: string;
  dateTime: string;
  teamA: { name: string; logo: string };
  teamB: { name: string; logo: string };
  scoreA: number;
  scoreB: number;
  prizePool: string; // formatted, e.g. "2,000"
  participants: number;
  status: "upcoming" | "latest" | "completed";
  // detail-only fields
  backgroundImage: any;
  userPosition: number;
  totalParticipants: number;
  entries: LeaderboardEntry[];
}

const generateEntries = (): LeaderboardEntry[] => {
  const names = [
    "Player 0004",
    "Player 0008",
    "Player 0009",
    "Player 0004",
    "Player 0004",
    "Player 0004",
    "Player 0004",
    "Player 0004",
    "Player 0004",
  ];
  return names.map((name, i) => ({
    rank: i + 1,
    playerName: name,
    result: i < 5 ? "Won" : null,
  }));
};

export const leaderboardMatches: LeaderboardMatch[] = [
  {
    id: "lb1",
    matchId: "m1",
    leagueId: "l1",
    title: "FIFA World Cup",
    teamA: mockMatches[0].teamA,
    teamB: mockMatches[0].teamB,
    scoreA: 2,
    scoreB: 1,
    prizePool: "2,500",
    participants: 142,
    dateTime: "15 Jan, 2026, 8.30am",
    status: "upcoming",
    backgroundImage: mockMatches[1].backgroundImage,
    userPosition: 12,
    totalParticipants: 100,
    entries: generateEntries(),
  },
  {
    id: "lb2",
    matchId: "m3",
    leagueId: "l2",
    title: "NBA Finals",
    teamA: mockMatches[2].teamA,
    teamB: mockMatches[2].teamB,
    scoreA: 102,
    scoreB: 98,
    prizePool: "5,000",
    participants: 86,
    dateTime: "16 Jan, 2026, 9.00pm",
    status: "latest",
    backgroundImage: mockMatches[2].backgroundImage,
    userPosition: 5,
    totalParticipants: 200,
    entries: generateEntries(),
  },
  {
    id: "lb3",
    matchId: "m5",
    leagueId: "l1",
    title: "Premier League",
    teamA: mockMatches[4].teamA,
    teamB: mockMatches[4].teamB,
    scoreA: 0,
    scoreB: 0,
    prizePool: "1,200",
    participants: 310,
    dateTime: "14 Jan, 2026, 3.00pm",
    status: "completed",
    backgroundImage: mockMatches[4].backgroundImage,
    userPosition: 1,
    totalParticipants: 350,
    entries: generateEntries(),
  },
  {
    id: "lb4",
    matchId: "m4",
    leagueId: "l3",
    title: "Super Bowl",
    teamA: mockMatches[3].teamA,
    teamB: mockMatches[3].teamB,
    scoreA: 24,
    scoreB: 21,
    prizePool: "10,000",
    participants: 520,
    dateTime: "1 Feb, 2026, 6.30pm",
    status: "upcoming",
    backgroundImage: mockMatches[3].backgroundImage,
    userPosition: 156,
    totalParticipants: 600,
    entries: generateEntries(),
  },
  {
    id: "lb5",
    matchId: "m6",
    leagueId: "l2",
    title: "NBA Playoffs",
    teamA: mockMatches[5].teamA,
    teamB: mockMatches[5].teamB,
    scoreA: 110,
    scoreB: 115,
    prizePool: "3,500",
    participants: 120,
    dateTime: "10 Jan, 2026, 7.00pm",
    status: "completed",
    backgroundImage: mockMatches[5].backgroundImage,
    userPosition: 42,
    totalParticipants: 150,
    entries: generateEntries(),
  },
];
