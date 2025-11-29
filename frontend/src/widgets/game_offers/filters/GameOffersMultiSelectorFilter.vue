<script setup lang="ts">
import type { IGameOffersMultiSelectorFiltersProps } from '@/features/filters/interface/FilterUI'
import { useSelectorFiltersMultiProps } from '@/features/filters/lib/useFiltersProps'
import MultiSelectorFilter from '@/features/filters/ui/MultiSelectorFilter.vue'

const props = defineProps<IGameOffersMultiSelectorFiltersProps>()

const multiSelectorFilterProps = useSelectorFiltersMultiProps(props)

const handleValueClick = (value: string) => {
	props.updateFilter({
		name: props.name,
		value: value,
		isActive: !props.modelValue?.[value] 
	})
}
</script>

<template>
	<MultiSelectorFilter
		:values="props.values"
		:model-value="props.modelValue"
		:is-active="multiSelectorFilterProps.isActive.value"
		:label="props.label ?? 'label'"
		:selected-count="multiSelectorFilterProps.selectedCount.value"
		
		:handle-label-click="multiSelectorFilterProps.handleLabelClick"
		:handle-value-click="handleValueClick"/>
</template>