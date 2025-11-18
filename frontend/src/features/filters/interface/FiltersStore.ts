import type { AvailableFiltersStore, GamesAvailableFiltersStore } from "@/entities/domain_stores/model/Filter"
import type { Ref } from "vue"


export type SelectedFiltersStates = | GamesSelectedFiltersState

export type GamesSelectedFiltersState = {
	sort: string,
	genre: Record<string, true>,
	activation: Record<string, true>
}


export type SelectedFilterUpdateFor<T extends SelectedFiltersStates, K extends keyof T> = 
	T[K] extends Record<string, true> ? { name: K, value: string, isActive: boolean} :
	T[K] extends string ? { name: K, value: string } :
	never

export type SelectedFilterUpdate<T extends SelectedFiltersStates = SelectedFiltersStates> = {
	[K in keyof T]: SelectedFilterUpdateFor<T, K>
}[keyof T]

export type GamesSelectedFilterUpdate = SelectedFilterUpdate<GamesSelectedFiltersState>


export type SelectedFiltersStore<T extends SelectedFiltersStates> = Partial<T>

export type GamesSelectedFiltersStore = SelectedFiltersStore<GamesSelectedFiltersState>


export interface IFiltersFeatureStore<
	T extends AvailableFiltersStore,
	K extends SelectedFilterUpdate
> {
	availableFilters: Ref<T | null>,
	fetchAvailableFilters: () => Promise<void>,
	applySelectedFilter: (filter: K) => void
	resetSelectedFilters: () => void
}

export type IGamesFiltersFeatureStore = IFiltersFeatureStore<GamesAvailableFiltersStore, GamesSelectedFilterUpdate>


export interface FilterEmits<T extends SelectedFilterUpdate> {
	updateFilter: (filter: T) => void,
	resetFilters: () => void,
	applyFilters?: () => void,
	toggleFilter: (filterName: T["name"]) => void,
	modelActive: Ref<Record<T["name"], true>>
}
