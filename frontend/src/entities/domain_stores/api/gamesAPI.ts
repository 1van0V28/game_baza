import type { GamesCatalogData } from "../model/Game"
import { mockGamesData } from "./mockGames"


export const searchGameAPI = async (searchInput: string): Promise<GamesCatalogData> => {
	console.log("searchGameAPI выполняется...")
	return fetch(`/api/games?search=${searchInput}`)
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