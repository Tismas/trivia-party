import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./views/Home.vue";
import MenuView from "./views/Menu.vue";
import LobbyView from "./views/Lobby.vue";
import GameView from "./views/Game.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/menu", component: MenuView },
  { path: "/lobby", component: LobbyView },
  { path: "/game", component: GameView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
