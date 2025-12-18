import type { SelectedFiltersStates, SelectedFilterUpdate } from "../interface/FiltersStore"


export function getOpenedFiltersAuto<T extends SelectedFiltersStates>(
	openedFilters: Record<SelectedFilterUpdate<T>["name"], true>,
	filterName: SelectedFilterUpdate<T>["name"]
): Record<SelectedFilterUpdate<T>["name"], true> {
	const newOpenedFilters = {} as Record<SelectedFilterUpdate<T>["name"], true>

	if (!openedFilters[filterName]) {
		newOpenedFilters[filterName] = true
	}

	return newOpenedFilters
}


export function getOpenedFilters<T extends SelectedFiltersStates>(
	openedFilters: Record<SelectedFilterUpdate<T>["name"], true>,
	filterName: SelectedFilterUpdate<T>["name"]
): Record<SelectedFilterUpdate<T>["name"], true> {
	const newOpenedFilters = {...openedFilters} 

	if (!openedFilters[filterName]) {
		newOpenedFilters[filterName] = true
	} else {
		delete newOpenedFilters[filterName]
	}

	return newOpenedFilters
}