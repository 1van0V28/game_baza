import { fetchGameInfoAPI } from "@/entities/domain_stores/api/gamesAPI"
import { gameInfoStore, gamesStore } from "@/entities/domain_stores/stores/domainStores"
import { gamePreview } from "./gamePreview"


export const useGameInfo = (gameID: string) => {

	async function fetchGameInfo() {
		gameInfoStore.setData(null)
		gameInfoStore.setIsPending(true)
		try {
			const data = await fetchGameInfoAPI(gameID)

			gameInfoStore.setData(data)
		}
		catch (error) {
			console.log(error)
			const errorMessage = error instanceof Error ? error.message : String(error)
			gameInfoStore.setError(errorMessage)
		}
		finally {
			gameInfoStore.setIsPending(false)
		}
	}

	function updateGamePreview() {
		const games = gamesStore.data.value?.games
		
		if (!games) return
			
		for (const game of games) {
			if (game.id == gameID) {
				gamePreview.value = game
			}
		}
	}

	return {
		fetchGameInfo,
		updateGamePreview
	}
}