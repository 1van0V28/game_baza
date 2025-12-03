import { 
	ResetBehavior,
	type GamesMonoSelectorsDefinition, 
	type GamesMultiSelectorsDefinition,
	type GamesFiltersDefinition, 
} from "@/features/filters/interface/FilterDefinition"
import { TypeFilter } from "@/features/filters/interface/FiltersStore"


export const gamesMonoSelectors: GamesMonoSelectorsDefinition[] = [
	{
		name: "sort",
		type: TypeFilter.MonoSelectorString,
		values: [
			"popularity",
			"cheap",
			"expensive",
			"sale",
			"release_date",
			"addition_date",
			"alphabet",
			"rating"
		],
		defaultValue: "popularity",
		resetBehavior: ResetBehavior.ToDefault
	},
]

export const gamesMultiSelectors: GamesMultiSelectorsDefinition[] = [
	{
		name: "genre",
		type: TypeFilter.MultiSelectorString,
		label: "Жанр",
		resetBehavior: ResetBehavior.Clear
	},
	{
		name: "activation",
		type: TypeFilter.MultiSelectorString,
		label: "Активация",
		resetBehavior: ResetBehavior.Clear
	}
]

export const gamesFiltersDefinition: GamesFiltersDefinition[][] = [
	gamesMonoSelectors,
	gamesMultiSelectors
]