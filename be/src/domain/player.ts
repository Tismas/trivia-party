import { randomUUID } from "crypto";

export class Player {
  id: string;
  name: string;
  currentRoom: string | null;
  currentPoints: number;

  constructor() {
    this.id = randomUUID();
    this.name = "";
    this.currentRoom = null;
    this.currentPoints = 0;
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      points: this.currentPoints,
    };
  }
}

const players: Player[] = [];

export const addPlayer = (player: Player) => {
  players.push(player);
};

export const setPlayerName = (player: Player, name: string) => {
  player.name = name;
};
