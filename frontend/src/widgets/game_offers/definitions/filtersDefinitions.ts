import { 
	ResetBehavior, 
	type GameOffersFiltersDefinition, 
	type GameOffersMonoSelectorRangeDefinition, 
	type GameOffersMonoSelectorStringDefinition, 
	type GameOffersMultiSelectorDefinition 
} from "@/features/filters/interface/FilterDefinition"

export const gameOffersMonoSelectorsString: GameOffersMonoSelectorStringDefinition[] = [
	{
		name: "sort",
		values: [
			"popularity",
			"cheap",
			"expensive",
			"sale",
			"alphabet",
			"rating"
		],
		defaultValue: "cheap",
		resetBehavior: ResetBehavior.ToDefault
	}
]

export const gameOffersMonoSelectorsRange: GameOffersMonoSelectorRangeDefinition[] = [
	{
		name: "price",
		label: "Цена",
		values: [
			undefined,
			[0, 1000],
			[1000, 3000],
			[3000, 6000],
			[6000, 0] 
		],
		resetBehavior: ResetBehavior.Clear
	}
]

export const gameOffersMultiSelectors: GameOffersMultiSelectorDefinition[] = [
	{
		name: "store",
		label: "Магазин",
		resetBehavior: ResetBehavior.Clear
	},
	{
		name: "platform",
		label: "Платформа",
		resetBehavior: ResetBehavior.Clear
	}
]

export const gameOffersFiltersDefinition: GameOffersFiltersDefinition[][] = [
	gameOffersMonoSelectorsString,
	gameOffersMonoSelectorsRange,
	gameOffersMultiSelectors
]