import type { AvailableFilterItem, AvailableFilterItemURL } from "../model/Filter"


export const fetchAvailableGenresFilterAPI = async (): Promise<AvailableFilterItem[]> => {
	console.log("fetchAvailableGenresFilterAPI выполняется...")
	return fetch("http://127.0.0.1:8000/genres", { method: "GET" })
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableGenresFilterAPI: ${response.status}`)
			}
			
			return response.json()
		})
		.then((data) => data)
		.catch((error) => { throw error })
}

export const fetchAvailableStoresFilterAPI = async (): Promise<AvailableFilterItemURL[]> => {
	console.log("fetchAvailableStoresFilterAPI выполняется...")
	return fetch("http://127.0.0.1:8000/stores", { method: "GET" })
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка fetchAvailableStoresFilterAPI: ${response.status}`)
			}

			return response.json()
		})
		.then((data) => data)
		.catch((error) => { throw error })
}