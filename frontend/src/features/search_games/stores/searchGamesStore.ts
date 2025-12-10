import type { GameBase } from "@/entities/domain_stores/model/Game"
import { ref } from "vue"
import { updateFetchDataController } from "@/entities/domain_stores/lib/fetchData"
import { gamesStore } from "@/entities/domain_stores/stores/domainStores"
import { searchGameAPI } from "@/entities/domain_stores/api/gamesAPI"


const searchGameController = ref<AbortController>()


export const searchGamesStore = {
	searchGames: async (filtersQuery: string) => {
		const newSearchGameController = updateFetchDataController(searchGameController)

		gamesStore.setIsPending(true)
		try {
			const last_id = gamesStore.data.value?.last_id ?? 0
			const data = await searchGameAPI(last_id, filtersQuery, newSearchGameController)

			if (gamesStore.data.value) {
				gamesStore.data.value.items.push(...data.items)
				gamesStore.data.value.has_more = data.has_more
				gamesStore.data.value.last_id = data.last_id
			} else {
				gamesStore.setData(data)
			}
		}
		catch (error) {
			console.log(error)
			const errorMessage = error instanceof Error ? error.message : String(error)
			gamesStore.setError(errorMessage)
		}
		finally {
			gamesStore.setIsPending(false)
			searchGameController.value = undefined
		}
	},

	resetData: () => {
		gamesStore.setData(null)
	},

	getGameByID: (gameID: string): GameBase | undefined => {
		const games = gamesStore.data.value?.items

		if (!games) return

		for (const game of games) {
			if (game.id == gameID) return game
		}
	}
}