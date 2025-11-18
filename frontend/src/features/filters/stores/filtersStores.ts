import { gamesFiltersDefinition } from "@/widgets/gallary/definitions/filtersDefinitions"
import type { GamesSelectedFiltersState } from "../interface/FiltersStore"
import { useFiltersStore } from "../lib/useFiltersStore"
import type { GamesFiltersDefinition } from "../interface/FilterUI"


export const searchGamesFiltersStore = useFiltersStore<GamesSelectedFiltersState, GamesFiltersDefinition>(gamesFiltersDefinition)