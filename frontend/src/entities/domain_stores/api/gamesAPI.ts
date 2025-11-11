import type { GameBase } from "../model/Game"
import { mockGames } from "./mockGames"


export const searchGameAPI = async (searchInput: string): Promise<GameBase[]> => {
	console.log("searchGameAPI выполняется...")
	return fetch(`/api/games?search=${searchInput}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка searchGameAPI: ${response.status}`)
			}
			return new Promise<GameBase[]>((resolve) => { // тестирование получения карточек игр
				setTimeout(() => resolve(mockGames), 4000)
			}) 
		})
		.then((data) => data)
		.catch((error) => {
			throw error 
		})
}