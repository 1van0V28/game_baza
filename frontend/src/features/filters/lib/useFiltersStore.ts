import type { SelectedFiltersStates, SelectedFiltersStore } from "../interface/FiltersStore"
import { ResetBehavior, type FiltersDefinitions } from "../interface/FilterUI"
import { ref } from "vue"


function setFilterDefaultValue<T extends SelectedFiltersStates, K extends keyof T>(
	initFiltersState: SelectedFiltersStore<T>,
	filterName: K,
	filterValue: T[K]
) {
	initFiltersState[filterName] = filterValue
}


function getInitFiltersState<T extends SelectedFiltersStates, K extends FiltersDefinitions>(filtersDefinition: K[]) {
	const initFiltersState = {} as SelectedFiltersStore<T>

	filtersDefinition.forEach((definition) => {
		if (definition.defaultValue && definition.name) {
			setFilterDefaultValue(initFiltersState, definition.name, definition.defaultValue as T[keyof T])
		}
	})

	return initFiltersState
}


export const useFiltersStore = <T extends SelectedFiltersStates, K extends FiltersDefinitions>(filtersDefinition: K[]) => {
	const filters = ref<SelectedFiltersStore<T>>(getInitFiltersState(filtersDefinition))

	function updateFilters<K extends keyof SelectedFiltersStates>(filter: { name: K, value: T[K] }) {
		filters.value[filter.name] = filter.value
	}

	function resetFilters() {
		filtersDefinition.forEach((definition) => {
			switch (definition.resetBehavior) {
				case ResetBehavior.None:
					break
				case ResetBehavior.ToDefault:
					filters.value[definition.name] = definition.defaultValue
					break
				case ResetBehavior.Clear: 
					delete filters.value[definition.name]
			}
		})
	}

	
	return {
		filters,
		updateFilters,
		resetFilters
	}
}