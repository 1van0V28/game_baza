import { 
	ResetBehavior, 
	type GameOffersMonoSelectorStringDefinition,
	type GameOffersMonoSelectorRangeDefinition,
	type GameOffersMultiSelectorDefinition,
	type GameOffersFiltersDefinition
} from "@/features/filters/interface/FilterDefinition"
import { TypeFilter } from "@/features/filters/interface/FiltersStore"

export const gameOffersMonoSelectorsString: GameOffersMonoSelectorStringDefinition[] = [
	{
		name: "sort",
		type: TypeFilter.MonoSelectorString,
		values: [
			"cheap",
			"expensive",
		],
		defaultValue: "cheap",
		resetBehavior: ResetBehavior.ToDefault,
	}
]

export const gameOffersMonoSelectorsRange: GameOffersMonoSelectorRangeDefinition[] = [
	{
		name: "price_discount",
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

export const gameOffersMultiSelectors: GameOffersMultiSelectorDefinition[] = [
	{
		name: "stores",
		type: TypeFilter.MultiSelectorString,
		label: "Магазин",
		resetBehavior: ResetBehavior.Clear,
	}
]

export const gameOffersFiltersDefinition: GameOffersFiltersDefinition[][] = [
	gameOffersMonoSelectorsString,
	gameOffersMonoSelectorsRange,
	gameOffersMultiSelectors
]