import { 
	TypeFilter,
	type IGameOffersFiltersFeatureStore, 
	type GameOffersSelectedFiltersState, 
	type GameOffersSelectedFilterUpdate 
} from "../interface/FiltersStore"
import type { GameOffersFiltersDefinition } from "../interface/FilterDefinition"
import type { GameOffersAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import { useFiltersStore } from "../lib/useFiltersStore"
import { useDomainStore } from "@/entities/domain_stores/lib/useDomainStore"
import { gameOffersFiltersDefinition } from "@/widgets/game_offers/definitions/filtersDefinitions"
import { fetchAvailableGameOffersFiltersAPI } from "@/entities/domain_stores/api/filtersAPI"
import { updateMultiSelectorValue } from "../lib/filtersUpdates"


export const useGameOffersFilters = (): IGameOffersFiltersFeatureStore => {
	const gameOffersSelectedFilters = useFiltersStore<GameOffersSelectedFiltersState, GameOffersFiltersDefinition>(gameOffersFiltersDefinition)
	const gameOffersAvailableFilters = useDomainStore<GameOffersAvailableFiltersStore>()

	async function fetchAvailableFilters() {
		gameOffersAvailableFilters.setIsPending(true)
		try {
			const data = await fetchAvailableGameOffersFiltersAPI()

			const mapedData = {} as GameOffersAvailableFiltersStore
			data.forEach((filter) => {
				mapedData[filter.name] = filter.values
			})
			
			gameOffersAvailableFilters.setData(mapedData)
		}
		catch (error) {
			console.log(error)
			const errorMessage = error instanceof Error ? error.message : String(error)
			gameOffersAvailableFilters.setError(errorMessage)
		}
		finally {
			gameOffersAvailableFilters.setIsPending(false)
		}
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
		availableFilters: gameOffersAvailableFilters.data,
		fetchAvailableFilters,
		applySelectedFilter,
		resetSelectedFilters,
	}
}