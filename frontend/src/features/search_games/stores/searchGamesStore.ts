import { searchGameAPI } from "@/entities/domain_store/api/gamesAPI"
import { gamesStore } from "@/entities/domain_store/stores/domainStores"


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
	}
}