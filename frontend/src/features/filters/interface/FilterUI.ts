import type { Ref } from "vue"
import type { 
	SelectedFiltersStates, 
	GamesSelectedFiltersState, 
	SelectedFilterUpdate, 
	GameOffersSelectedFiltersState,
	GamesMonoSelectorStringFilterName,
	GamesMonoSelectorRangeFilterName, 
	GamesMultiSelectorFilterName,
	GameOffersMonoSelectorStringFilterName,
	ResetFilterValue,
	RangeFilterValue,
	GameOffersMonoSelectorRangeFilterName,
	GameOffersMultiSelectorFilterName
} from "./FiltersStore"
import type { TypeFilterDefinition, TypeFilterDefinitionResetClear } from "./FilterDefinition"

interface IFilterPropsBase<T, K extends SelectedFiltersStates, KName extends keyof K> {
	values: T | undefined,
	modelValue: K[KName] | undefined,
	modelActive: Ref<Record<SelectedFilterUpdate<K>["name"], true>>
	updateFilter: (filter: SelectedFilterUpdate<K>) => void,
	toggleFilter: (filterName: SelectedFilterUpdate<K>["name"]) => void
}
export type IFilterProps<T, K extends SelectedFiltersStates, KName extends keyof K> =
	& IFilterPropsBase<T, K, KName>
	& TypeFilterDefinition<T, K, KName>
type IFilterPropsResetClear<T, K extends SelectedFiltersStates, KName extends keyof K> = 
	& IFilterPropsBase<T, K, KName>
	& TypeFilterDefinitionResetClear<T, K, KName>
	

export type IGamesMonoSelectorStringFiltersProps = IFilterProps<
	string[], 
	GamesSelectedFiltersState, 
	GamesMonoSelectorStringFilterName
	>
export type IGamesMonoSelectorRangeFiltersProps = IFilterPropsResetClear<
	ResetFilterValue<RangeFilterValue>[],
	GamesSelectedFiltersState,
	GamesMonoSelectorRangeFilterName
>
export type IGamesMultiSelectorFiltersProps = IFilterPropsResetClear<
	string[], 
	GamesSelectedFiltersState, 
	GamesMultiSelectorFilterName
	> 
	
export type IGameOffersMonoSelectorStringFilterProps = IFilterProps<
	string[], 
	GameOffersSelectedFiltersState, 
	GameOffersMonoSelectorStringFilterName
	>
export type IGameOffersMonoSelectorRangeFilterProps = IFilterPropsResetClear<
	ResetFilterValue<RangeFilterValue>[], 
	GameOffersSelectedFiltersState, 
	GameOffersMonoSelectorRangeFilterName
	> 
export type IGameOffersMultiSelectorFiltersProps = IFilterProps<
	string[], 
	GameOffersSelectedFiltersState, 
	GameOffersMultiSelectorFilterName
	>


interface UIFilterProps<T, K> {
	values: T | undefined
	modelValue: K | undefined
	isActive: boolean
}
export interface UISelectorProps<T extends string[], K> extends UIFilterProps<T, K> {
	label?: string
	handleLabelClick: () => void
	handleValueClick: (value: T[number]) => void
}
export interface UIMonoSelectorProps<T extends string[]> extends UISelectorProps<T, T[number]> {
	isHighlighted: boolean
}
export interface UIMultiSelectorProps<T extends string[]> extends UISelectorProps<T, Record<T[number], true>> {
	selectedCount: number
}