import type { SelectedFiltersStates, ResetFilterValue, RangeFilterValue } from "../interface/FiltersStore"
import type { IFilterProps } from "../interface/FilterUI"
import type { AvailableFilterItems } from "@/entities/domain_stores/model/Filter"
import { computed } from "vue"


export const useSelectorFiltersProps = <
	T, 
	K extends SelectedFiltersStates, 
	KName extends keyof K
> (props: IFilterProps<T, K, KName>) => {
		const isActive = computed(() => Boolean(props.modelActive.value[props.name]))

		const handleLabelClick = () => { props.toggleFilter(props.name) }

		return {
			isActive,
			handleLabelClick,
		}
	}

export const useSelectorFiltersMultiProps = <
	T, 
	K extends SelectedFiltersStates, 
	KName extends keyof K
> (props: IFilterProps<T, K, KName>) => {
		const selectorFiltersProps = useSelectorFiltersProps<T, K, KName>(props)

		const selectedCount = computed(() => Object.keys(props.modelValue ?? {}).length)

		return {
			isActive: selectorFiltersProps.isActive,
			handleLabelClick: selectorFiltersProps.handleLabelClick,
			selectedCount,
		}
	}


export const getAvailableFilterValues = (availableFilterItems: AvailableFilterItems | null): string[] | undefined => {
	if (!availableFilterItems) return undefined

	return availableFilterItems.map((filterItem) => filterItem.name)
}


export const getRangeFilterValueTranslate = (value: ResetFilterValue<RangeFilterValue>): string => {
	if (!value) {
		return "любая"
	} else if (value[0] == 0) {
		return `до ${value[1]}₽`
	} else if (value[1] == 0) {
		return `от ${value[0]}₽`
	} else {
		return `${value[0]}-${value[1]}₽`
	}
}

export const getTranslateMap = (values: ResetFilterValue<RangeFilterValue>[] | undefined) => computed(() => {
	if (!values) return undefined

	const translateMap = {} as Record<string, ResetFilterValue<RangeFilterValue>>
	values.forEach((range) => {
		const translate = getRangeFilterValueTranslate(range)
		translateMap[translate] = range
	})

	return translateMap
})