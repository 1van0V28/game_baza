<script setup lang="ts">
import type { RangeFilterValue, ResetFilterValue } from '@/features/filters/interface/FiltersStore';
import type { IGameOffersMonoSelectorRangeFilterProps } from '@/features/filters/interface/FilterUI'
import { useSelectorFiltersProps } from '@/features/filters/lib/useFiltersProps'
import MonoSelectorFilter from '@/features/filters/ui/MonoSelectorFilter.vue'
import { computed } from 'vue'

const props = defineProps<IGameOffersMonoSelectorRangeFilterProps>()

const monoSelectorFilterProps = useSelectorFiltersProps(props)

function getTranslate(value: ResetFilterValue<RangeFilterValue>): string {
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
const translateMap = computed(() => {
	if (!props.values) return undefined

	const translateMap = {} as Record<string, ResetFilterValue<RangeFilterValue>>
	props.values.forEach((range) => {
		const translate = getTranslate(range)
		translateMap[translate] = range
	})

	return translateMap
})

const handleValueClick = (value: string) => {
	if (!translateMap.value) return

	props.updateFilter({
		name: props.name,
		value: translateMap.value[value],
	})
}
</script>

<template>
	<MonoSelectorFilter
		:values="translateMap && Object.keys(translateMap)"
		:label="props.label"
		:model-value="props.modelValue && getTranslate(props.modelValue)"
		:is-active="monoSelectorFilterProps.isActive.value"
		
		:handle-label-click="monoSelectorFilterProps.handleLabelClick"
		:handle-value-click="handleValueClick" />
</template>