import { randomUUID } from "crypto";
import type { Room } from "./room";
import { TypedServerSocket } from "../events/socket";

const playerTimeoutAfterDisconnect = 1; // in minutes

export class Player {
  socket: TypedServerSocket;
  id: string;
  name: string;
  currentPoints: number;
  room: Room | null;
  disconnectedAt: Date | null;

  constructor(socket: TypedServerSocket, userId: string) {
    this.socket = socket;
    this.id = userId;
    this.name = "";
    this.room = null;
    this.disconnectedAt = null;
    this.currentPoints = 0;
    players[this.id] = this;

    console.log(`Player connected ${this.id}`);
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      points: this.currentPoints,
    };
  }

  setName(name: string) {
    console.log(`Player ${this.id} is known as ${name}`);
    this.name = name;
    this.socket.emit("name-changed", name);
  }

  joinRoom(room: Room) {
    if (this.room) return;

    this.room = room;
    room.join(this);

    this.socket.join(room.id);
    this.socket.emit("room-joined", room.toDto());
  }

  leaveRoom() {
    if (!this.room) return;

    this.socket.leave(this.room.id);
    this.socket.emit("room-left");

    this.room.leave(this);
    this.room = null;
  }
}

const players: Record<string, Player> = {};

export const getOrCreatePlayer = (
  socket: TypedServerSocket,
  userId?: string
) => {
  if (!userId) return new Player(socket, randomUUID());

  if (players[userId]) {
    players[userId].disconnectedAt = null;
    players[userId].socket = socket;
    return players[userId];
  }

  return new Player(socket, userId);
};

export const findPlayer = (playerId: string): Player | undefined => {
  return players[playerId];
};

const clearDisconnectedPlayer = () => {
  Object.values(players).forEach((player) => {
    if (!player.disconnectedAt) return;

    const timeSinceDisconnect =
      Number(new Date()) - Number(player.disconnectedAt);
    if (timeSinceDisconnect < playerTimeoutAfterDisconnect * 60 * 1000) {
      if (player.room) {
        player.room.leave(player);
      }
      console.log(`Removed disconnected player ${player.id}(${player.name})`);
      delete players[player.id];
    }
  });
};

setInterval(clearDisconnectedPlayer, 60 * 1000);
