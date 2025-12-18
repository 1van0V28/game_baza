import type { GameBase, GameInfo } from "@/entities/domain_stores/model/Game"
import { computed, ref } from "vue"
import { gameInfoStore } from "@/entities/domain_stores/stores/domainStores"
import { fetchData, updateFetchDataController } from "@/entities/domain_stores/lib/fetchData"
import { fetchGameInfoAPI } from "@/entities/domain_stores/api/gamesAPI"
import { searchGamesStore } from "@/features/search_games/stores/searchGamesStore"

const gamePreview = ref<GameBase | undefined>()
const gameInfoController = ref<AbortController>()


export const useGameInfo = (gameID: string) => {
	const gameBaseInfo = computed(() => gamePreview.value ?? gameInfoStore.data.value)

	const gameInfo = computed((): GameInfo => {
		const gameInfoData = gameInfoStore.data.value ?? {} 
		const { offers, ...gameFullInfo } = gameInfoData

		return {
			...gameFullInfo,
			...gameBaseInfo.value,
		}
	})

	async function fetchGameInfo() {
		const newGameInfoController = updateFetchDataController(gameInfoController)

		gameInfoStore.setData(null)
		await fetchData(gameInfoStore, () => fetchGameInfoAPI(gameID, newGameInfoController))
		gameInfoController.value = undefined
	}

	function updateGamePreview() {
		if (gameID == gamePreview.value?.id) return

		gamePreview.value = searchGamesStore.getGameByID(gameID)

		fetchGameInfo()
	}

	return {
		gameInfo,
		fetchGameInfo,
		updateGamePreview
	}
}