import type { AvailableFilterItem, AvailableFilterItemURL } from "../model/Filter"
import { gamesAvailableGenresFilter, gamesAvailableStoresFilter } from "./mockFilters"


export const fetchAvailableGenresFilterAPI = async (): Promise<AvailableFilterItem[]> => {
	console.log("fetchAvailableGenresFilterAPI выполняется...")
	return fetch("") //http://127.0.0.1:8000/genres
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableGenresFilterAPI: ${response.status}`)
			}
			return new Promise<AvailableFilterItem[]>((resolve) => {
				setTimeout(() => resolve(gamesAvailableGenresFilter), 4000)
			})
		})
		.then((data) => data)
		.catch((error) => { throw error })
}

export const fetchAvailableStoresFilterAPI = async (): Promise<AvailableFilterItemURL[]> => {
	console.log("fetchAvailableStoresFilterAPI выполняется...")
	return fetch("") //http://127.0.0.1:8000/stores
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableStoresFilterAPI: ${response.status}`)
			}
			return new Promise<AvailableFilterItemURL[]>((resolve) => {
				setTimeout(() => resolve(gamesAvailableStoresFilter), 6000)
			})
		})
		.then((data) => data)
		.catch((error) => { throw error })
}