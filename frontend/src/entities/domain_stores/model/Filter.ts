export type AvailableFilterName = | GamesAvailableFilterName

export type GamesAvailableFilterName = | "genre" | "activation"


interface AvailableFilter<T extends AvailableFilterName> {
	name: T,
	values: string[]
}

export type GamesAvailableFilter = AvailableFilter<GamesAvailableFilterName>