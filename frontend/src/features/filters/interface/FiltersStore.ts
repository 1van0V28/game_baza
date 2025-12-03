import type { Ref } from "vue"
import type { 
	AvailableFilterName, 
	AvailableFiltersStore, 
	GamesAvailableFilterName,
	GameOffersAvailableFilterName
} from "@/entities/domain_stores/model/Filter"


export enum TypeFilter {
	MonoSelectorString = "mono_selector_string",
	MonoSelectorRange = "mono_selector_range",
	MultiSelectorString = "multi_selector_string"
}


export type ResetFilterValue<T> = T | undefined

export type RangeFilterValue = [number, number]
export type MultiStringFilterValue = Record<string, true> 


export type SelectedFiltersStates = | GamesSelectedFiltersState | GameOffersSelectedFiltersState
export type GamesSelectedFiltersState = {
	sort: string,
	genre: MultiStringFilterValue,
	activation: MultiStringFilterValue
}
export type GameOffersSelectedFiltersState = {
	sort: string,
	store: MultiStringFilterValue,
	platform: MultiStringFilterValue,
	price: ResetFilterValue<RangeFilterValue>
}


export type TypeFilterFor<T extends SelectedFiltersStates, K extends keyof T> = 
	T[K] extends string ? TypeFilter.MonoSelectorString :
	T[K] extends ResetFilterValue<RangeFilterValue> ? TypeFilter.MonoSelectorRange :
	T[K] extends MultiStringFilterValue? TypeFilter.MultiSelectorString :
	unknown


export type TypeFilterName<T extends SelectedFiltersStates, KValue extends T[keyof T]> = {
	[K in keyof T]: T[K] extends KValue ? K : never
}[keyof T]

export type GamesMonoSelectorFilterName = TypeFilterName<GamesSelectedFiltersState, string>
export type GamesMultiSelectorFilterName = TypeFilterName<GamesSelectedFiltersState, MultiStringFilterValue>

export type GameOffersMonoSelectorStringFilterName = TypeFilterName<GameOffersSelectedFiltersState, string>
export type GameOffersMonoSelectorRangeFilterName = TypeFilterName<GameOffersSelectedFiltersState, ResetFilterValue<RangeFilterValue>>
export type GameOffersMultiSelectorFilterName = TypeFilterName<GameOffersSelectedFiltersState, MultiStringFilterValue>


export type SelectedFilterUpdateFor<T extends SelectedFiltersStates, K extends keyof T> = 
	T[K] extends MultiStringFilterValue ? { name: K, type: TypeFilterFor<T, K>, value: string, isActive: boolean} :
	T[K] extends string ? { name: K, type: TypeFilterFor<T, K>, value: string } :
	T[K] extends ResetFilterValue<RangeFilterValue> ? { name: K, type: TypeFilterFor<T, K>, value: ResetFilterValue<RangeFilterValue>} :
	never
export type SelectedFilterUpdate<T extends SelectedFiltersStates> = {
	[K in keyof T]: SelectedFilterUpdateFor<T, K>
}[keyof T]

export type GamesSelectedFilterUpdate = SelectedFilterUpdate<GamesSelectedFiltersState>
export type GameOffersSelectedFilterUpdate = SelectedFilterUpdate<GameOffersSelectedFiltersState>


export type SelectedFiltersStore<T extends SelectedFiltersStates> = Partial<T>


export interface IBaseFiltersFeatureStore<T extends SelectedFiltersStates> {
	selectedFilters: Ref<SelectedFiltersStore<T>>,
	applySelectedFilter: (filter: SelectedFilterUpdate<T>) => void,
	resetSelectedFilters: () => void,
	getFiltersQuery?: () => URLSearchParams
}
interface IFullFiltersFeatureStore<
	T extends AvailableFilterName,
	K extends SelectedFiltersStates,
> extends IBaseFiltersFeatureStore<K> {
	availableFilters: Ref<AvailableFiltersStore<T> | null>,
	fetchAvailableFilters: () => Promise<void>
}

export type IGamesFiltersFeatureStore = IFullFiltersFeatureStore<
	GamesAvailableFilterName, 
	GamesSelectedFiltersState
	>
export type IGameOffersFiltersFeatureStore = IFullFiltersFeatureStore<
	GameOffersAvailableFilterName, 
	GameOffersSelectedFiltersState
	>


export interface FilterEmits<K extends SelectedFiltersStates> {
	updateFilter: (filter: SelectedFilterUpdate<K>) => void,
	resetFilters: () => void,
	applyFilters?: () => void,
	toggleFilter: (filterName: SelectedFilterUpdate<K>["name"]) => void,
	modelActive: Ref<Record<SelectedFilterUpdate<K>["name"], true>>
}