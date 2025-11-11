import type { SelectedFilter } from "./FiltersStore"


type MultiSelectorValue<T extends string[]> = Record<T[number], true> | undefined

export interface IMultiSelectorFilterProps<
	T extends string[],
	K extends SelectedFilter["name"]
	> {
	name: K
	values: T | undefined
	modelValue: MultiSelectorValue<T>,
	defaultValue?: MultiSelectorValue<T>,
	label?: string,
	updateFilter: (filter: SelectedFilter) => void
}