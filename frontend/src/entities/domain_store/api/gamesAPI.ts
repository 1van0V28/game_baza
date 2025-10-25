export const searchGameAPI = async (searchInput: string) => {
	return fetch("", {
		body: searchInput
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка searchGameAPI: ${response.status}`)
			}
			return response.json()
		})
		.then((json) => json)
		.catch((error) => { throw error })
}