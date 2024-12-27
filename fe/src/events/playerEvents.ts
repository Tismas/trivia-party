import { router } from "../router";
import type { TypedSocket } from "./socket";

export const handlePlayerEvents = (socket: TypedSocket) => {
  socket.on("name-changed", () => {
    router.push("/menu");
  });
};
