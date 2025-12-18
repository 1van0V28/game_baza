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


export type SelectedFiltersStates = 
	| GamesSelectedFiltersState 
	| GameOffersSelectedFiltersState
type AvailableFiltersStates = 
	| GamesAvailableFiltersState
	| GameOffersAvailableFiltersState

export type GamesSelectedFiltersState = {
	title: string
	sort: string,
	price: ResetFilterValue<RangeFilterValue>
	genres: MultiStringFilterValue,
	stores: MultiStringFilterValue
}
export type GameOffersSelectedFiltersState = {
	sort: string,
	price_discount: ResetFilterValue<RangeFilterValue>
	stores: MultiStringFilterValue
}

type AvailableFiltersStateFor<T extends SelectedFiltersStates, A extends AvailableFilterName & keyof T> = {
	[K in keyof T as K extends A ? K : never]: T[K]
}

type GamesAvailableFiltersState = AvailableFiltersStateFor<GamesSelectedFiltersState, GamesAvailableFilterName>
type GameOffersAvailableFiltersState = AvailableFiltersStateFor<GameOffersSelectedFiltersState, GameOffersAvailableFilterName>


export type TypeFilterFor<T extends SelectedFiltersStates | AvailableFiltersStates, K extends keyof T> = 
	T[K] extends string ? TypeFilter.MonoSelectorString :
	T[K] extends ResetFilterValue<RangeFilterValue> ? TypeFilter.MonoSelectorRange :
	T[K] extends MultiStringFilterValue? TypeFilter.MultiSelectorString :
	unknown


export type TypeFilterName<T extends SelectedFiltersStates, KValue extends T[keyof T]> = {
	[K in keyof T]: T[K] extends KValue ? K : never
}[keyof T]

export type GamesMonoSelectorStringFilterName = TypeFilterName<GamesSelectedFiltersState, string>
export type GamesMonoSelectorRangeFilterName = TypeFilterName<GamesSelectedFiltersState, ResetFilterValue<RangeFilterValue>>
export type GamesMultiSelectorFilterName = TypeFilterName<GamesSelectedFiltersState, MultiStringFilterValue>

export type GameOffersMonoSelectorStringFilterName = TypeFilterName<GameOffersSelectedFiltersState, string>
export type GameOffersMonoSelectorRangeFilterName = TypeFilterName<GameOffersSelectedFiltersState, ResetFilterValue<RangeFilterValue>>
export type GameOffersMultiSelectorFilterName = TypeFilterName<GameOffersSelectedFiltersState, MultiStringFilterValue>


export type SelectedFilterUpdateFor<T extends SelectedFiltersStates | AvailableFiltersStates, K extends keyof T> = 
	T[K] extends MultiStringFilterValue ? { name: K, type: TypeFilterFor<T, K>, value: string, isActive: boolean} :
	T[K] extends string ? { name: K, type: TypeFilterFor<T, K>, value: string } :
	T[K] extends ResetFilterValue<RangeFilterValue> ? { name: K, type: TypeFilterFor<T, K>, value: ResetFilterValue<RangeFilterValue>} :
	never
export type SelectedFilterUpdate<T extends SelectedFiltersStates | AvailableFiltersStates> = {
	[K in keyof T]: SelectedFilterUpdateFor<T, K>
}[keyof T]

export type GamesSelectedFilterUpdate = SelectedFilterUpdate<GamesSelectedFiltersState>
export type GamesAvailableFilterUpdate = SelectedFilterUpdate<GamesAvailableFiltersState>
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
	S extends SelectedFiltersStates,
	A extends AvailableFiltersStates
> extends IBaseFiltersFeatureStore<S> {
	availableFilters: AvailableFiltersStore<T>,
	fetchAvailableFilters: () => void
	applyAvailableFilter?: (filter: SelectedFilterUpdate<A>) => void
}

export type IGamesFiltersFeatureStore = IFullFiltersFeatureStore<
	GamesAvailableFilterName, 
	GamesSelectedFiltersState,
	GamesAvailableFiltersState
	>
export type IGameOffersFiltersFeatureStore = IFullFiltersFeatureStore<
	GameOffersAvailableFilterName, 
	GameOffersSelectedFiltersState,
	GameOffersAvailableFiltersState
	>


export interface FilterEmits<K extends SelectedFiltersStates> {
	updateFilter: (filter: SelectedFilterUpdate<K>) => void,
	resetFilters: () => void,
	applyFilters?: () => void,
	toggleFilter: (filterName: SelectedFilterUpdate<K>["name"]) => void,
	modelActive: Ref<Record<SelectedFilterUpdate<K>["name"], true>>
}