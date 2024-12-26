import { router } from "../router";
import type { TypedSocket } from "./socket";

export interface Player {
  id: string;
  name: string;
}

export interface ClientPlayerEventHandlers {
  "name-changed": (name: string) => void;
}

export const handlePlayerEvents = (socket: TypedSocket) => {
  socket.on("name-changed", () => {
    router.push("/menu");
  });
};
