export type ServerGameEventHandlers = {
  "vote-category": (categoryId: string) => void;
  "choose-answer": (answer: string) => void;
};

export type ServerPlayerEventHandlers = {
  "set-name": (name: string) => void;
};

export type ServerRoomEventHandlers = {
  "create-room": () => void;
  "join-room": (roomId: string) => void;
  "leave-room": () => void;
  "start-game": () => void;
};

export type ServerEventHandlers = ServerGameEventHandlers &
  ServerPlayerEventHandlers &
  ServerRoomEventHandlers;
