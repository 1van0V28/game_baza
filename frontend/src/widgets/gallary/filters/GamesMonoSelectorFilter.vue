<script setup lang="ts">
import type { IGamesMonoSelectorStringFiltersProps } from '@/features/filters/interface/FilterUI'
import { useSelectorFiltersProps } from '@/features/filters/lib/useFiltersProps'
import MonoSelectorFilter from '@/features/filters/ui/MonoSelectorFilter.vue'

const props = defineProps<IGamesMonoSelectorStringFiltersProps>()

const monoSelectorFilterProps = useSelectorFiltersProps(props)

const handleValueClick = (value: string) => {
	props.updateFilter({
		name: props.name,
		type: props.type,
		value: value,
	})
}
</script>

<template>
	<MonoSelectorFilter
		:values="props.values"
		:model-value="props.modelValue"
		:is-active="monoSelectorFilterProps.isActive.value"
		:is-highlighted="true"
		
		:handle-label-click="monoSelectorFilterProps.handleLabelClick"
		:handle-value-click="handleValueClick" />
</template>