import { mockMatches } from "./mock";

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  result: "Won" | "Lose" | null;
}

// Single unified interface used by LeaderboardCard + LeaderboardDetail
export interface LeaderboardMatch {
  id: string;
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
    title: "Fifa World Cup",
    teamA: mockMatches[0].teamA,
    teamB: mockMatches[0].teamB,
    scoreA: 2,
    scoreB: 1,
    prizePool: "2,000",
    participants: 200,
    dateTime: "15 Jan, 2026, 8.30am",
    status: "upcoming",
    backgroundImage: mockMatches[0].backgroundImage,
    userPosition: 12,
    totalParticipants: 100,
    entries: generateEntries(),
  },
  {
    id: "lb2",
    title: "Fifa World Cup",
    teamA: mockMatches[2].teamA,
    teamB: mockMatches[2].teamB,
    scoreA: 2,
    scoreB: 1,
    prizePool: "2,000",
    participants: 200,
    dateTime: "15 Jan, 2026, 8.30am",
    status: "latest",
    backgroundImage: mockMatches[2].backgroundImage,
    userPosition: 5,
    totalParticipants: 100,
    entries: generateEntries(),
  },
  {
    id: "lb3",
    title: "Fifa World Cup",
    teamA: mockMatches[4].teamA,
    teamB: mockMatches[4].teamB,
    scoreA: 2,
    scoreB: 1,
    prizePool: "2,000",
    participants: 200,
    dateTime: "15 Jan, 2026, 8.30am",
    status: "completed",
    backgroundImage: mockMatches[4].backgroundImage,
    userPosition: 3,
    totalParticipants: 100,
    entries: generateEntries(),
  },
];
