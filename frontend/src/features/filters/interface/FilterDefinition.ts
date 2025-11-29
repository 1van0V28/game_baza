import type { 
	SelectedFiltersStates,
	GamesSelectedFiltersState,
	GamesMonoSelectorFilterName,
	GamesMultiSelectorFilterName,
	GameOffersSelectedFiltersState, 
	GameOffersMonoSelectorStringFilterName,
	GameOffersMonoSelectorRangeFilterName, 
	GameOffersMultiSelectorFilterName, 
	ResetFilterValue,
	RangeFilterValue 
} from "./FiltersStore"

export enum ResetBehavior {
	None = "none",
	ToDefault = "toDefault",
	Clear = "clear"
}

export interface TypeFilterDefinition<
	T,
	K extends SelectedFiltersStates,
	KName extends keyof K,
	> {
	name: KName,
	values?: T | undefined,
	defaultValue?: K[KName],
	label?: string,
	resetBehavior: ResetBehavior
} 
export interface TypeFilterDefinitionResetClear<
	T,
	K extends SelectedFiltersStates,
	KName extends keyof K,
	> extends TypeFilterDefinition<T, K, KName> {
	label: string
	resetBehavior: ResetBehavior.Clear
} 

export type FiltersDefinitions<T extends SelectedFiltersStates> =  TypeFilterDefinition<unknown, T, keyof T>


export type GamesFiltersDefinition =
	| GamesMonoSelectorsDefinition
	| GamesMultiSelectorsDefinition
export type GameOffersFiltersDefinition = 
	| GameOffersMonoSelectorStringDefinition
	| GameOffersMonoSelectorRangeDefinition
	| GameOffersMultiSelectorDefinition


export type GamesMonoSelectorsDefinition = TypeFilterDefinition<
	string[],
	GamesSelectedFiltersState,
	GamesMonoSelectorFilterName
	>
export type GamesMultiSelectorsDefinition = TypeFilterDefinitionResetClear<
	string[],
	GamesSelectedFiltersState,
	GamesMultiSelectorFilterName
	>

export type GameOffersMonoSelectorStringDefinition = 
	TypeFilterDefinition<
	string[],
	GameOffersSelectedFiltersState,
	GameOffersMonoSelectorStringFilterName
	>
export type GameOffersMonoSelectorRangeDefinition = TypeFilterDefinitionResetClear<
	ResetFilterValue<RangeFilterValue>[],
	GameOffersSelectedFiltersState,
	GameOffersMonoSelectorRangeFilterName
	> 
export type GameOffersMultiSelectorDefinition = TypeFilterDefinition<
	string[],
	GameOffersSelectedFiltersState,
	GameOffersMultiSelectorFilterName
	>