export type AvailableFiltersStore<T extends AvailableFilterName> = Record<T, string[]>

export type GamesAvailableFiltersStore = AvailableFiltersStore<GamesAvailableFilterName>
export type GameOffersAvailableFiltersStore = AvailableFiltersStore<GameOffersAvailableFilterName>


export type AvailableFilterName = | GamesAvailableFilterName | GameOffersAvailableFilterName
export type GamesAvailableFilterName = | "genre" | "activation"
export type GameOffersAvailableFilterName = | "store" | "platform"


interface AvailableFilter<T extends AvailableFilterName> {
	name: T,
	values: string[]
}

export type GamesAvailableFilter = AvailableFilter<GamesAvailableFilterName>
export type GameOffersAvailableFilter = AvailableFilter<GameOffersAvailableFilterName>