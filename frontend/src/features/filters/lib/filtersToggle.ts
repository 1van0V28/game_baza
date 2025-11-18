import type { SelectedFilterUpdate } from "../interface/FiltersStore"


export function getOpenedFiltersAuto(
	openedFilters: Record<SelectedFilterUpdate["name"], true>,
	filterName: SelectedFilterUpdate["name"]
): Record<SelectedFilterUpdate["name"], true> {
	const newOpenedFilters = {} as Record<SelectedFilterUpdate["name"], true>

	if (!openedFilters[filterName]) {
		newOpenedFilters[filterName] = true
	}

	return newOpenedFilters
}


export function getOpenedFilters(
	openedFilters: Record<SelectedFilterUpdate["name"], true>,
	filterName: SelectedFilterUpdate["name"]
): Record<SelectedFilterUpdate["name"], true> {
	const newOpenedFilters = {...openedFilters} 

	if (!openedFilters[filterName]) {
		newOpenedFilters[filterName] = true
	} else {
		delete newOpenedFilters[filterName]
	}

	return newOpenedFilters
}