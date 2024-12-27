type PlayerId = string;
export interface Player {
  id: PlayerId;
  name: string;
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
export type Votes = Record<AnswerId, Record<PlayerId, VoteTime>>;
