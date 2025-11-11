import type { GamesAvailableFilter } from "../model/Filter"
import { gamesFilters } from "./mockFilters"


export const fetchAvailableGamesFiltersAPI = async (): Promise<GamesAvailableFilter[]> => {
	console.log("fetchAvailableGamesFiltersAPI выполняется...")
	return fetch("")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableGamesFilters: ${response.status}`)
			}
			return new Promise<GamesAvailableFilter[]>((resolve) => {
				setTimeout(() => resolve(gamesFilters), 4000)
			})
		})
		.then((data) => data)
		.catch((error) => { 
			throw error
		})
}