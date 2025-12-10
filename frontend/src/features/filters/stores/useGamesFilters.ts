import type { GamesAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import type { IGamesFiltersFeatureStore, GamesSelectedFilterUpdate, GamesAvailableFilterUpdate } from "../interface/FiltersStore"
import { TypeFilter } from "../interface/FiltersStore"
import { ref, watch } from "vue"
import { gamesAvailableGenresFilter, gamesAvailableStoresFilter } from "@/entities/domain_stores/stores/domainStores"
import { getAvailableFilterValues } from "../lib/useFiltersProps"
import { fetchData } from "../../../entities/domain_stores/lib/fetchData"
import { fetchAvailableGenresFilterAPI, fetchAvailableStoresFilterAPI } from "@/entities/domain_stores/api/filtersAPI"
import { updateMultiSelectorValue } from "../lib/filtersUpdates"
import { searchGamesFiltersStore } from "./filtersStores"


const gamesAvailableFiltersStore: GamesAvailableFiltersStore = {
	genres: ref(),
	stores: ref()
} 


export const useGamesFilters = (): IGamesFiltersFeatureStore => {
	watch(gamesAvailableGenresFilter.data, () => { 
		gamesAvailableFiltersStore.genres.value = getAvailableFilterValues(gamesAvailableGenresFilter.data.value) 
	})
	watch(gamesAvailableStoresFilter.data, () => {
		gamesAvailableFiltersStore.stores.value = getAvailableFilterValues(gamesAvailableStoresFilter.data.value)
	})
	
	function fetchAvailableFilters() {
		fetchData(gamesAvailableGenresFilter, fetchAvailableGenresFilterAPI)
		fetchData(gamesAvailableStoresFilter, fetchAvailableStoresFilterAPI)
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
	
	function applyAvailableFilter(filter: GamesAvailableFilterUpdate) {
		const availableFilterValues = gamesAvailableFiltersStore[filter.name].value

		if (!availableFilterValues) return

		else if (!availableFilterValues.includes(filter.value)) {
			gamesAvailableFiltersStore[filter.name].value = [...availableFilterValues, filter.value]
		}

		applySelectedFilter(filter)
	}

	function resetSelectedFilters() {
		searchGamesFiltersStore.resetFilters()
	}

	return {
		selectedFilters: searchGamesFiltersStore.filters,
		availableFilters: gamesAvailableFiltersStore,
		fetchAvailableFilters,
		applySelectedFilter,
		resetSelectedFilters,
		applyAvailableFilter
	}
}