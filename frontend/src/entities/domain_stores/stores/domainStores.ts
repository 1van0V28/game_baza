import type { GamesCatalogData } from "../model/Game"
import type { AvailableFilterItem, AvailableFilterItemURL } from "../model/Filter"
import type { GameFull } from "../model/Game"
import { useDomainStore } from "../lib/useDomainStore"


export const gamesStore = useDomainStore<GamesCatalogData>()

export const gamesAvailableGenresFilter = useDomainStore<AvailableFilterItem[]>()
export const gamesAvailableStoresFilter = useDomainStore<AvailableFilterItemURL[]>()

export const gameInfoStore = useDomainStore<GameFull>()