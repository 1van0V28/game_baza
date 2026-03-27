import { 
	ResetBehavior,
	type GamesMonoSelectorsStringDefinition, 
	type GamesMultiSelectorsDefinition,
	type GamesFiltersDefinition,
	type GamesMonoSelectorRangeDefinition, 
} from "@/features/filters/interface/FilterDefinition"
import { TypeFilter } from "@/features/filters/interface/FiltersStore"


export const gamesMonoSelectors: GamesMonoSelectorsStringDefinition[] = [
	{
		name: "title",
		type: TypeFilter.MonoSelectorString,
		resetBehavior: ResetBehavior.Clear
	},
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

export const gamesMonoSelectorsRange: GamesMonoSelectorRangeDefinition[] = [
	{
		name: "price",
		type: TypeFilter.MonoSelectorRange,
		label: "Цена",
		values: [
			undefined,
			[0, 1000],
			[1000, 3000],
			[3000, 6000],
			[6000, 0] 
		],
		resetBehavior: ResetBehavior.Clear,
	}
]

export const gamesMultiSelectors: GamesMultiSelectorsDefinition[] = [
	{
		name: "genres",
		type: TypeFilter.MultiSelectorString,
		label: "Жанр",
		resetBehavior: ResetBehavior.Clear
	},
	{
		name: "stores",
		type: TypeFilter.MultiSelectorString,
		label: "Магазин",
		resetBehavior: ResetBehavior.Clear
	}
]

export const gamesFiltersDefinition: GamesFiltersDefinition[][] = [
	gamesMonoSelectors,
	gamesMonoSelectorsRange,
	gamesMultiSelectors
]