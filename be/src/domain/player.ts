import { randomUUID } from "crypto";

export class Player {
  id: string;
  name: string;
  currentRoom: string | null;

  constructor() {
    this.id = randomUUID();
    this.name = "";
    this.currentRoom = null;
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
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
