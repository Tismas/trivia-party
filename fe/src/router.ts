import { createRouter, createMemoryHistory } from "vue-router";

import HomeView from "./views/Home.vue";
import MenuView from "./views/Menu.vue";
import LobbyView from "./views/Lobby.vue";
import GameView from "./views/Game.vue";
import JoinView from "./views/Join.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/menu", component: MenuView },
  { path: "/lobby", component: LobbyView },
  { path: "/game", component: GameView },
  { path: "/join", component: JoinView },
];

export const router = createRouter({
  history: createMemoryHistory("/trivia-party"),
  routes,
});
