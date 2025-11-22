import type { GameBase } from "@/entities/domain_stores/model/Game"
import { gamesStore } from "@/entities/domain_stores/stores/domainStores"
import { searchGameAPI } from "@/entities/domain_stores/api/gamesAPI"


export const searchGamesStore = {
	searchGame: async (searchInput: string) => {
		gamesStore.setIsPending(true)
		try {
			const data = await searchGameAPI(searchInput)
			gamesStore.setData(data)
		}
		catch (error) {
			console.log(error)
			const errorMessage = error instanceof Error ? error.message : String(error)
			gamesStore.setError(errorMessage)
		}
		finally {
			gamesStore.setIsPending(false)
		}
	},

	resetData: () => {
		gamesStore.setData(null)
	},

	getGameByID: (gameID: string): GameBase | undefined => {
		const games = gamesStore.data.value?.games

		if (!games) return

		for (const game of games) {
			if (game.id == gameID) return game
		}
	}
}