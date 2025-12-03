import type { IGamesFiltersFeatureStore, GamesSelectedFilterUpdate } from "../interface/FiltersStore"
import type { GamesAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import { TypeFilter } from "../interface/FiltersStore"
import { availableFilters } from "@/entities/domain_stores/stores/domainStores"
import { fetchAvailableGamesFiltersAPI } from "@/entities/domain_stores/api/filtersAPI"
import { updateMultiSelectorValue } from "../lib/filtersUpdates"
import { searchGamesFiltersStore } from "./filtersStores"


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
		if (filter.type == TypeFilter.MultiSelectorString) {
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
		selectedFilters: searchGamesFiltersStore.filters,
		availableFilters: availableFilters.data,
		fetchAvailableFilters,
		applySelectedFilter,
		resetSelectedFilters,
	}
}