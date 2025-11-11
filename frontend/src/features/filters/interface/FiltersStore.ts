import type { AvailableFilterName, GamesAvailableFilterName } from "@/entities/domain_stores/model/Filter"
import type { Ref } from "vue"


export type AvailableFiltersStore<T extends AvailableFilterName = AvailableFilterName> = Record<T, string[]>

export type GamesAvailableFiltersStore = AvailableFiltersStore<GamesAvailableFilterName>


export type SelectedFiltersStates = | GamesSelectedFiltersState

export type GamesSelectedFiltersState = {
	sort: string,
	genre: Record<string, true>,
	activation: Record<string, true>
}


export type SelectedFilter<T extends SelectedFiltersStates = SelectedFiltersStates> = { 
	[K in keyof T]: { name: K, value: T[K]}
}[keyof T]

export type GamesSelectedFilter = SelectedFilter<GamesSelectedFiltersState>


export type SelectedFiltersStore<T extends SelectedFiltersStates> = Partial<T>

export type GamesSelectedFiltersStore = SelectedFiltersStore<GamesSelectedFiltersState>


export interface IFiltersFeatureStore<
	T extends AvailableFiltersStore,
	K extends SelectedFilter
> {
	availableFilters: Ref<T | null>,
	fetchAvailableFilters: () => Promise<void>,
	applySelectedFilter: (filter: K) => void
	resetSelectedFilters: () => void
}

export type IGamesFiltersFeatureStore = IFiltersFeatureStore<GamesAvailableFiltersStore, GamesSelectedFilter>


export interface FilterEmits<T extends SelectedFilter> {
	updateFilter: (filter: T) => void,
	resetFilters: () => void,
	applyFilters?: () => void
}
