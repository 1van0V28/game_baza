import type { SelectedFiltersStates } from "../interface/FiltersStore"
import type { IFilterProps } from "../interface/FilterUI"
import { computed } from "vue"


export const useSelectorFiltersProps = <
	T, 
	K extends SelectedFiltersStates, 
	KName extends keyof K> (props: IFilterProps<T, K, KName>) => {
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
	KName extends keyof K> (props: IFilterProps<T, K, KName>) => {
		const selectorFiltersProps = useSelectorFiltersProps<T, K, KName>(props)

		const selectedCount = computed(() => Object.keys(props.modelValue ?? {}).length)

		return {
			isActive: selectorFiltersProps.isActive,
			handleLabelClick: selectorFiltersProps.handleLabelClick,
			selectedCount,
		}
	}