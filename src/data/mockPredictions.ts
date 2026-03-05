import { MatchCompetition } from "@/types";

export interface PredictionHistoryItem {
  id: string;
  match: MatchCompetition;
  predictedTeamId: string;
  predictedTeamAScore: number;
  predictedTeamBScore: number;
  status: "won" | "lose" | "pending"; // pending = latest active prediction
  potentialWin: number;
  actualWin: number;
  rank: string; // e.g. "3/200"
  timestamp: string;
}

// Merge mock matches into some mock predictions
import { mockMatches } from "./mock";

export const mockPredictions: PredictionHistoryItem[] = [
  {
    id: "p1",
    match: mockMatches[0], // Latest FIFA match
    predictedTeamId: mockMatches[0].teamA.id,
    predictedTeamAScore: 2,
    predictedTeamBScore: 1,
    status: "pending", // active / latest
    potentialWin: 200,
    actualWin: 0,
    rank: "N/A",
    timestamp: "2026-01-14T10:00:00Z",
  },
  {
    id: "p2",
    match: { ...mockMatches[9], title: "Fifa World Cup" }, // "Won" example
    predictedTeamId: mockMatches[9].teamA.id,
    predictedTeamAScore: 2,
    predictedTeamBScore: 1,
    status: "won",
    potentialWin: 200,
    actualWin: 200,
    rank: "3/200",
    timestamp: "2026-01-15T10:00:00Z",
  },
  {
    id: "p3",
    match: { ...mockMatches[2], title: "Fifa World Cup" }, // "Lose" example
    predictedTeamId: mockMatches[2].teamB.id,
    predictedTeamAScore: 2,
    predictedTeamBScore: 1,
    status: "lose",
    potentialWin: 200,
    actualWin: -200,
    rank: "13/200",
    timestamp: "2026-01-12T10:00:00Z",
  },
];
