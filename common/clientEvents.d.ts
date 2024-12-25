import type { ClientGameEventHandlers } from "../fe/src/events/gameEvents";
import type { ClientPlayerEventHandlers } from "../fe/src/events/playerEvents";
import type { ClientRoomEventHandlers } from "../fe/src/events/roomEvents";

export type ClientEventHandlers = ClientGameEventHandlers &
  ClientPlayerEventHandlers &
  ClientRoomEventHandlers;
