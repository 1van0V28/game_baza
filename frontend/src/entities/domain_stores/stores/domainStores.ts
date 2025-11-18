import type { GamesCatalogData } from "../model/Game"
import type { GamesAvailableFiltersStore } from "../model/Filter"
import { useDomainStore } from "../lib/useDomainStore"


export const gamesStore = useDomainStore<GamesCatalogData>()

export const availableFilters = useDomainStore<GamesAvailableFiltersStore>()