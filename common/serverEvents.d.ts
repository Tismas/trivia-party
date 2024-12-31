export type ServerGameEventHandlers = {
  "vote-category": (categoryId: number) => void;
  "choose-answer": (answer: number) => void;
};

export type ServerPlayerEventHandlers = {
  "set-name": (name: string) => void;
};

export type ServerRoomEventHandlers = {
  "create-room": () => void;
  "join-room": (roomId: string) => void;
  "leave-room": () => void;
  "start-game": () => void;
  "back-to-lobby": () => void;
};

export type ServerEventHandlers = ServerGameEventHandlers &
  ServerPlayerEventHandlers &
  ServerRoomEventHandlers;
