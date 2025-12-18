import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/home_page/ui/HomePage.vue'
import GamePage from '@/pages/game_page/ui/GamePage.vue'


export const enum Routes {
	home = "Home",
	game = "Game"
}

const routes = [
	{ path: "/", name: Routes.home, component: HomePage },
	{ path: "/game/:gameID", name: Routes.game, component: GamePage, props: true }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
