import { type GamesFiltersDefinition, type GamesMonoSelectorsDefinition, type GamesMultiSelectorsDefinition, ResetBehavior } from "@/features/filters/interface/FilterUI"


export const gamesFiltersDefinition: GamesFiltersDefinition[] = [
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