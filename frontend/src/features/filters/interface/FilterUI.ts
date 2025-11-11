import type { SelectedFilterUpdate } from "./FiltersStore"


type MultiSelectorValue<T extends string[]> = Record<T[number], true> | undefined

export interface IMultiSelectorFilterProps<T extends string[]> {
	name: SelectedFilterUpdate["name"]
	values: T | undefined
	modelValue: MultiSelectorValue<T>,
	defaultValue?: MultiSelectorValue<T>,
	label?: string,
	updateFilter: (filter: SelectedFilterUpdate) => void
}