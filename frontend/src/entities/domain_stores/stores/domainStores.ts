import type { GamesCatalogData } from "../model/Game"
import type { GamesAvailableFiltersStore } from "../model/Filter"
import type { GameFull } from "../model/Game"
import { useDomainStore } from "../lib/useDomainStore"


export const gamesStore = useDomainStore<GamesCatalogData>()

export const availableFilters = useDomainStore<GamesAvailableFiltersStore>()

export const gameInfoStore = useDomainStore<GameFull>()