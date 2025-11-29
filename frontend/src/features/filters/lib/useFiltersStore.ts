import { ResetBehavior, type FiltersDefinitions } from "../interface/FilterDefinition"
import type { SelectedFiltersStates, SelectedFiltersStore } from "../interface/FiltersStore"
import { ref } from "vue"


function getInitFiltersState<T extends SelectedFiltersStates, K extends FiltersDefinitions<T>>(filtersDefinition: K[][]) {
	const initFiltersState = {} as SelectedFiltersStore<T>

	filtersDefinition.forEach((definitionList) => {
		definitionList.forEach((definition) => {
			if (definition.defaultValue && definition.name) {
				initFiltersState[definition.name] = definition.defaultValue
			}
		})
	})

	return initFiltersState
}


export const useFiltersStore = <T extends SelectedFiltersStates, K extends FiltersDefinitions<T>>(filtersDefinition: K[][]) => {
	const filters = ref<SelectedFiltersStore<T>>(getInitFiltersState(filtersDefinition))

	function updateFilters<K extends keyof T>(filter: { name: K, value: T[K] }) {
		filters.value[filter.name] = filter.value
	}

	function resetFilters() {
		filtersDefinition.forEach((definitionList) => {
			definitionList.forEach((definition) => {
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
		})
	}

	return {
		filters,
		updateFilters,
		resetFilters
	}
}