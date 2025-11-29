<script setup lang="ts">
import type { IGameOffersMonoSelectorStringFilterProps } from '@/features/filters/interface/FilterUI'
import { useSelectorFiltersProps } from '@/features/filters/lib/useFiltersProps'
import MonoSelectorFilter from '@/features/filters/ui/MonoSelectorFilter.vue'

const props = defineProps<IGameOffersMonoSelectorStringFilterProps>()

const monoSelectorFilterProps = useSelectorFiltersProps(props)

const handleValueClick = (value: string) => {
	props.updateFilter({
		name: props.name,
		value: value,
	})
}
</script>

<template>
	<MonoSelectorFilter
		:values="props.values"
		:model-value="props.modelValue"
		:is-active="monoSelectorFilterProps.isActive.value"
		
		:handle-label-click="monoSelectorFilterProps.handleLabelClick"
		:handle-value-click="handleValueClick" />
</template>