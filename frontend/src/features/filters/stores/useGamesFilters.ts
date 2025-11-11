import type { IGamesFiltersFeatureStore, GamesAvailableFiltersStore, GamesSelectedFilter } from "../interface/FiltersStore"
import { useDomainStore } from "@/entities/domain_stores/lib/useDomainStore"
import { fetchAvailableGamesFiltersAPI } from "@/entities/domain_stores/api/filtersAPI"
import { searchGamesFiltersStore } from "./filtersStores"


export const useGamesFilters = (): IGamesFiltersFeatureStore => {
	const availableFilters = useDomainStore<GamesAvailableFiltersStore>()

	async function fetchAvailableFilters() {
		availableFilters.setIsPending(true)
		try {
			const data = await fetchAvailableGamesFiltersAPI()
			
			const mapedData = {} as GamesAvailableFiltersStore
			data.forEach((filter) => {
				mapedData[filter.name] = filter.values
			})

			availableFilters.setData(mapedData)
		}
		catch (error) {
			console.log(error)
			const errorMessage = error instanceof Error ? error.message : String(error)
			availableFilters.setError(errorMessage)
		}
		finally {
			availableFilters.setIsPending(false)
		}
	}

	function applySelectedFilter(filter: GamesSelectedFilter) {
		searchGamesFiltersStore.updateFilters(filter)
	}           

	function resetSelectedFilters() {
		searchGamesFiltersStore.resetFilters()
	}

	return {
		availableFilters: availableFilters.data,
		fetchAvailableFilters,
		applySelectedFilter,
		resetSelectedFilters
	}
}