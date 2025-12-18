import type { GamesCatalogData, GameFull } from "../model/Game"


export const searchGameAPI = async (last_id: number, filtersQuery: string, abortController: AbortController): Promise<GamesCatalogData> => {
	console.log("searchGameAPI выполняется...")
	return fetch(`http://127.0.0.1:8000/games?last_id=${last_id}&per_page=50&${filtersQuery}`, {
		method: "GET",
		signal: abortController.signal 
	}) 
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка searchGameAPI: ${response.status}`)
			}
			
			return response.json()
		})
		.then((data) => data)
		.catch((error) => {
			throw error 
		})
}

export const fetchGameInfoAPI = async (gameID: string, abortController: AbortController): Promise<GameFull> => {
	console.log("fetchGameInfoAPI выполняется...")
	return fetch(`http://127.0.0.1:8000/games/${gameID}`, { 
		method: "GET",
		signal: abortController.signal 
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchGameInfoAPI: ${response.status}`)
			}

			return response.json()
		})
		.then((data) => data)
		.catch((error) => { throw error })
}