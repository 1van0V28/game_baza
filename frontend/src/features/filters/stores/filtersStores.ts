import type { GamesSelectedFiltersState } from "../interface/FiltersStore"
import { useFiltersStore } from "../lib/useFiltersStore"


export const searchGamesFiltersStore = useFiltersStore<GamesSelectedFiltersState>()