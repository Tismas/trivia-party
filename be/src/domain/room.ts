import { TypedRoomSocket } from "../events/socket";
import { io } from "../io";
import { Game } from "./game/game";
import type { Player } from "./player";

export class Room {
  socket: TypedRoomSocket;
  id: string;
  players: Player[];
  game: Game | null;

  constructor() {
    this.id = generateRoomId();
    this.socket = io.to(this.id);
    this.players = [];
    this.game = null;
    rooms[this.id] = this;

    console.log("Room created", this.id);
  }

  join(player: Player) {
    console.log(`Room ${this.id} joined by ${player.name}`);
    this.players.push(player);
    this.socket.emit("player-joined", player.toDto());
  }

  leave(player: Player) {
    console.log(`Room ${this.id} left by ${player.name}`);
    this.players = this.players.filter((p) => p.id !== player.id);

    if (this.players.length === 0) {
      if (this.game) {
        this.game.terminate();
      }
      delete rooms[this.id];
      console.log("Room deleted", this.id);
    } else {
      this.socket.emit("player-left", player.toDto());
    }
  }

  startGame() {
    for (const player of this.players) {
      player.currentPoints = 0;
    }

    this.game = new Game(this);
  }

  toDto() {
    return {
      id: this.id,
      players: this.players.map((p) => p.toDto()),
    };
  }
}

const rooms: Record<string, Room> = {};

export const findRoom = (roomId: string): Room | null => {
  return rooms[roomId.toUpperCase()] || null;
};

const generateRoomId = () => {
  const roomId = new Array(4).fill(0).map(generateRandomSymbol).join("");

  if (findRoom(roomId)) return generateRoomId();

  return roomId;
};

const generateRandomSymbol = () => {
  return String.fromCharCode(
    "A".charCodeAt(0) + Math.floor(Math.random() * 26)
  );
};
