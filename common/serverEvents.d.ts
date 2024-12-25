import type { ServerGameEventHandlers } from "../be/src/events/gameEvents";
import type { ServerPlayerEventHandlers } from "../be/src/events/playerEvents";
import type { ServerRoomEventHandlers } from "../be/src/events/roomEvents";

export type ServerEventHandlers = ServerGameEventHandlers &
  ServerPlayerEventHandlers &
  ServerRoomEventHandlers;
