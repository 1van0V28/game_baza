import { 
	ResetBehavior, 
	type GamesMonoSelectorsDefinition, 
	type GamesMultiSelectorsDefinition,
	type GamesFiltersDefinition, 
} from "@/features/filters/interface/FilterDefinition"


export const gamesMonoSelectors: GamesMonoSelectorsDefinition[] = [
	{
		name: "sort",
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
		label: "Жанр",
		resetBehavior: ResetBehavior.Clear
	},
	{
		name: "activation",
		label: "Активация",
		resetBehavior: ResetBehavior.Clear
	}
]

export const gamesFiltersDefinition: GamesFiltersDefinition[][] = [
	gamesMonoSelectors,
	gamesMultiSelectors
]