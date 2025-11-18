import type { Ref } from "vue/dist/vue.js"
import type { SelectedFiltersStates, SelectedFilterUpdate } from "./FiltersStore"


export enum ResetBehavior {
	None = "none",
	ToDefault = "toDefault",
	Clear = "clear"
}

interface TypeFilterDefinition<
	T,
	KName extends keyof SelectedFiltersStates,
	KValue extends SelectedFiltersStates[KName]
	>{
	name: KName,
	values?: T | undefined,
	defaultValue?: KValue,
	label?: string,
	resetBehavior: ResetBehavior
} 


export type FiltersDefinitions = | GamesFiltersDefinition

export type GamesFiltersDefinition = | GamesMonoSelectorsDefinition | GamesMultiSelectorsDefinition

export type GamesMonoSelectorsDefinition = TypeFilterDefinition<
	string[],
	MonoSelectorFilterName, 
	SelectedFiltersStates[MonoSelectorFilterName]
	>

export type GamesMultiSelectorsDefinition = TypeFilterDefinition<
	string[],
	MultiSelectorFilterName, 
	SelectedFiltersStates[MultiSelectorFilterName]
	>


interface IFilterProps<
	T,
	KName extends keyof SelectedFiltersStates,
	KValue extends SelectedFiltersStates[KName]
	> extends TypeFilterDefinition<
	T, 
	KName, 
	KValue
	> {
	values: T | undefined,
	modelValue: KValue | undefined,
	modelActive: Ref<Record<SelectedFilterUpdate["name"], true>>
	updateFilter: (filter: SelectedFilterUpdate) => void,
	toggleFilter: (filterName: SelectedFilterUpdate["name"]) => void
}


type TypeFilterName<T extends SelectedFiltersStates, KValue extends T[keyof T]> = {
	[K in keyof T]: T[K] extends KValue ? K : never
}[keyof T]

type MultiSelectorFilterName = TypeFilterName<SelectedFiltersStates, Record<string, true>>

type MonoSelectorFilterName = TypeFilterName<SelectedFiltersStates, string>


export type IMonoSelectorFiltersProps<T extends string[]> = IFilterProps<T, MonoSelectorFilterName, T[number]>

type MultiSelectorValue<T extends string[]> = Record<T[number], true>

export type IMultiSelectorFilterProps<T extends string[]> = IFilterProps<T, MultiSelectorFilterName, MultiSelectorValue<T>>