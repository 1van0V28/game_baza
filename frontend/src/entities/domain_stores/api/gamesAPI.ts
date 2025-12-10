import type { GamesCatalogData, GameFull } from "../model/Game"
import { mockGamesData, mockGameInfoData } from "./mockGames"


export const searchGameAPI = async (last_id: number, filtersQuery: string, abortController: AbortController): Promise<GamesCatalogData> => {
	console.log("searchGameAPI выполняется...")
	return fetch("", { signal: abortController.signal }) //http://127.0.0.1:8000/games?last_id=${last_id}&per_page=50&${filtersQuery}
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка searchGameAPI: ${response.status}`)
			}
			return new Promise<GamesCatalogData>((resolve) => { // тестирование получения карточек игр
				setTimeout(() => resolve(mockGamesData), 4000)
			}) 
		})
		.then((data) => data)
		.catch((error) => {
			throw error 
		})
}

export const fetchGameInfoAPI = async (gameID: string, abortController: AbortController): Promise<GameFull> => {
	console.log("fetchGameInfoAPI выполняется...")
	return fetch("", { signal: abortController.signal }) //http://127.0.0.1:8000/games/${gameID}
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchGameInfoAPI: ${response.status}`)
			}

			return new Promise<GameFull>((resolve) => { // тестирование получения информации об игре
				setTimeout(() => { resolve(mockGameInfoData) }, 4000)
			})
		})
		.then((data) => data)
		.catch((error) => { throw error })
}