import { createRouter, createMemoryHistory } from "vue-router";

import HomeView from "./views/Home.vue";
import MenuView from "./views/Menu.vue";
import LobbyView from "./views/Lobby.vue";
import GameView from "./views/Game.vue";
import JoinView from "./views/Join.vue";
import SummaryView from "./views/Summary.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/menu", component: MenuView },
  { path: "/join", component: JoinView },
  { path: "/lobby", component: LobbyView },
  { path: "/game", component: GameView },
  { path: "/summary", component: SummaryView },
];

export const router = createRouter({
  history: createMemoryHistory("/trivia-party"),
  routes,
});
