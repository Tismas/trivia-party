export type ClientRoomEventHandlers = {
  "room-joined": (room: Room) => void;
  "room-not-found": () => void;
  "player-joined": (player: Player) => void;
  "player-left": (player: Player) => void;
  "room-left": (roomId: string, playerId: string) => void;
  "game-started": () => void;
};

export type ClientPlayerEventHandlers = {
  "name-changed": (name: string) => void;
};

export type ClientGameEventHandlers = {
  "category-voted": () => void;
  "question-answered": () => void;
};

export type ClientEventHandlers = ClientGameEventHandlers &
  ClientPlayerEventHandlers &
  ClientRoomEventHandlers;
