import type { GamesSelectedFiltersState } from "../interface/FiltersStore"
import type { GamesFiltersDefinition } from "../interface/FilterDefinition"
import { useFiltersStore } from "../lib/useFiltersStore"
import { gamesFiltersDefinition } from "@/widgets/gallary/definitions/filtersDefinitions"


export const searchGamesFiltersStore = useFiltersStore<GamesSelectedFiltersState, GamesFiltersDefinition>(gamesFiltersDefinition)