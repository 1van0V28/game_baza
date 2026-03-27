<script setup lang="ts">
import type { IGameOffersMonoSelectorRangeFilterProps } from '@/features/filters/interface/FilterUI'
import { getRangeFilterValueTranslate, getTranslateMap, useSelectorFiltersProps } from '@/features/filters/lib/useFiltersProps'
import MonoSelectorFilter from '@/features/filters/ui/MonoSelectorFilter.vue'

const props = defineProps<IGameOffersMonoSelectorRangeFilterProps>()

const monoSelectorFilterProps = useSelectorFiltersProps(props)

const translateMap = getTranslateMap(props.values)

const handleValueClick = (value: string) => {
	if (!translateMap.value) return

	props.updateFilter({
		name: props.name,
		type: props.type,
		value: translateMap.value[value],
	})
}
</script>

<template>
	<MonoSelectorFilter
		:values="translateMap && Object.keys(translateMap)"
		:label="props.label"
		:model-value="props.modelValue && getRangeFilterValueTranslate(props.modelValue)"
		:is-active="monoSelectorFilterProps.isActive.value"
		:is-highlighted="false"
		
		:handle-label-click="monoSelectorFilterProps.handleLabelClick"
		:handle-value-click="handleValueClick" />
</template>