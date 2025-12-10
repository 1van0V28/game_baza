import { 
	TypeFilter,
	type IGameOffersFiltersFeatureStore, 
	type GameOffersSelectedFiltersState, 
	type GameOffersSelectedFilterUpdate 
} from "../interface/FiltersStore"
import type { GameOffersFiltersDefinition } from "../interface/FilterDefinition"
import type { AvailableFilterItemURL, GameOffersAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import { useFiltersStore } from "../lib/useFiltersStore"
import { useDomainStore } from "@/entities/domain_stores/lib/useDomainStore"
import { gameOffersFiltersDefinition } from "@/widgets/game_offers/definitions/filtersDefinitions"
import { computed } from "vue"
import { getAvailableFilterValues } from "../lib/useFiltersProps"
import { fetchData } from "../../../entities/domain_stores/lib/fetchData"
import { fetchAvailableStoresFilterAPI } from "@/entities/domain_stores/api/filtersAPI"
import { updateMultiSelectorValue } from "../lib/filtersUpdates"


export const useGameOffersFilters = (): IGameOffersFiltersFeatureStore => {
	const gameOffersSelectedFilters = useFiltersStore<GameOffersSelectedFiltersState, GameOffersFiltersDefinition>(gameOffersFiltersDefinition)
	const gameOffersAvailableStoresFilter = useDomainStore<AvailableFilterItemURL[]>()

	const gameOffersAvailableFiltersStore: GameOffersAvailableFiltersStore = {
		stores: computed(() => getAvailableFilterValues(gameOffersAvailableStoresFilter.data.value))
	}

	function fetchAvailableFilters() {
		fetchData(gameOffersAvailableStoresFilter, fetchAvailableStoresFilterAPI)
	}

	function applySelectedFilter(filter: GameOffersSelectedFilterUpdate) {
		if (filter.type == TypeFilter.MultiSelectorString) {
			const newModelValue = updateMultiSelectorValue(
				gameOffersSelectedFilters.filters.value[filter.name], 
				{ value: filter.value, isActive: filter.isActive }
			)
			gameOffersSelectedFilters.updateFilters({...filter, value: newModelValue})
		} else {
			gameOffersSelectedFilters.updateFilters(filter)
		}
	}

	function resetSelectedFilters() {
		gameOffersSelectedFilters.resetFilters()
	}

	return {
		selectedFilters: gameOffersSelectedFilters.filters,
		availableFilters: gameOffersAvailableFiltersStore,
		fetchAvailableFilters,
		applySelectedFilter,
		resetSelectedFilters,
	}
}