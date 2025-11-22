import type { GamesCatalogData, GameFull } from "../model/Game"
import { mockGamesData, mockGameInfoData } from "./mockGames"


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

export const fetchGameInfoAPI = async (gameID: string): Promise<GameFull> => {
	console.log("fetchGameInfoAPI выполняется...")
	return fetch(`/api/gamesInfo?id=${gameID}`)
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