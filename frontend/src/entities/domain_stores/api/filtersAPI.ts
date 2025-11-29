import type { GamesAvailableFilter, GameOffersAvailableFilter } from "../model/Filter"
import { gamesFilters, gameOffersFilters } from "./mockFilters"


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
		.catch((error) => { throw error })
}


export const fetchAvailableGameOffersFiltersAPI = async (): Promise<GameOffersAvailableFilter[]> => {
	console.log("fetchAvailableGameOffersFiltersAPI выполняется...")
	return fetch("")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableGameOffersFilters: ${response.status}`)
			}
			return new Promise<GameOffersAvailableFilter[]>((resolve) => {
				setTimeout(() => resolve(gameOffersFilters), 6000)
			})
		})
		.then((data) => data)
		.catch((error) => { throw error })
}