import type { Ref } from "vue"


export type AvailableFiltersStore<T extends AvailableFilterName> = Record<T, Ref<string[] | undefined>>

export type GamesAvailableFiltersStore = AvailableFiltersStore<GamesAvailableFilterName>
export type GameOffersAvailableFiltersStore = AvailableFiltersStore<GameOffersAvailableFilterName>


export type AvailableFilterName = | GamesAvailableFilterName | GameOffersAvailableFilterName
export type GamesAvailableFilterName = | "genres" | "stores"
export type GameOffersAvailableFilterName = | "stores"


export interface AvailableFilterItem {
	id: number,
	name: string
}
export interface AvailableFilterItemURL extends AvailableFilterItem {
	url: string
}

export type AvailableFilterItems = | AvailableFilterItem[] | AvailableFilterItemURL[]