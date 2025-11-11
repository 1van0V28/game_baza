import type { SelectedFiltersStates, SelectedFiltersStore } from "../interface/FiltersStore"
import { ref } from "vue"


export const useFiltersStore = <T extends SelectedFiltersStates>() => {
	const filters = ref<SelectedFiltersStore<T>>({} as SelectedFiltersStore<T>)

	function updateFilters<K extends keyof SelectedFiltersStates>(filter: { name: K, value: T[K] }) {
		filters.value[filter.name] = filter.value
	}

	function resetFilters() {
		filters.value = {} as T
	}

	
	return {
		filters,
		updateFilters,
		resetFilters
	}
}