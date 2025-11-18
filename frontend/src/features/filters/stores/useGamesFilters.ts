import type { IGamesFiltersFeatureStore, GamesSelectedFilterUpdate } from "../interface/FiltersStore"
import type { GamesAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import { availableFilters } from "@/entities/domain_stores/stores/domainStores"
import { fetchAvailableGamesFiltersAPI } from "@/entities/domain_stores/api/filtersAPI"
import { searchGamesFiltersStore } from "./filtersStores"
import { updateMultiSelectorValue } from "../lib/filtersUpdates"


export const useGamesFilters = (): IGamesFiltersFeatureStore => {

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

	function applySelectedFilter(filter: GamesSelectedFilterUpdate) {
		if (filter.name != "sort") {
			const newModelValue = updateMultiSelectorValue(
				searchGamesFiltersStore.filters.value[filter.name], 
				{ value: filter.value, isActive: filter.isActive }
			)
			searchGamesFiltersStore.updateFilters({...filter, value: newModelValue})
		} else {
			searchGamesFiltersStore.updateFilters(filter)
		}
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