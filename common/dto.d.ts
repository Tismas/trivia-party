type PlayerId = string;
export interface Player {
  id: PlayerId;
  name: string;
  points: number;
}

export interface AnswerDto {
  id: number;
  name: string;
}

export interface Room {
  id: string;
  players: Player[];
}

type AnswerId = string;
type VoteTime = number;

export interface VoteEntry {
  time: number;
  playerId: string;
}

export type VotesDto = Record<string, VoteEntry[]>;
export type VoteType = "category" | "question";
