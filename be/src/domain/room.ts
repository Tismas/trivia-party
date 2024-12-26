import type { Player } from "./player";

export class Room {
  id: string;
  players: Player[];

  constructor() {
    this.id = generateRoomId();
    this.players = [];
  }

  join(player: Player) {
    this.players.push(player);
    player.currentRoom = this.id;
  }

  leave(player: Player) {
    this.players = this.players.filter((p) => p.id !== player.id);
    if (this.players.length === 0) {
      rooms.splice(rooms.indexOf(this), 1);
    }
    player.currentRoom = null;
  }

  toDto() {
    return {
      id: this.id,
      players: this.players.map((p) => p.toDto()),
    };
  }
}

const rooms: Room[] = [];

export const createRoom = (): Room => {
  const room = new Room();
  rooms.push(room);
  return room;
};

export const joinRoom = (roomId: string, player: Player): Room | undefined => {
  if (player.currentRoom) return;
  const room = findRoom(roomId);
  if (!room) return;

  room.join(player);

  return room;
};

export const leaveRoom = (player: Player): Room | undefined => {
  if (!player.currentRoom) return;
  const room = findRoom(player.currentRoom);
  if (!room) return;

  room.leave(player);

  return room;
};

export const findRoom = (roomId: string) => {
  return rooms.find((room) => room.id.toLowerCase() === roomId.toLowerCase());
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

setInterval(() => {
  console.log("Current rooms", rooms);
}, 10000);
