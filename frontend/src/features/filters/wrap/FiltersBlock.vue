<script setup lang="ts" generic="T extends AvailableFiltersStore, K extends SelectedFilter">
import type { 
	AvailableFiltersStore, 
	SelectedFilter, 
	IFiltersFeatureStore,
	FilterEmits,
} from '../interface/FiltersStore'

const props = defineProps<{ 
	filtersFeatureStore: IFiltersFeatureStore<T, K>,
	isAutoApply: boolean
}>()

const emit = defineEmits(["update", "reset", "apply"])

const updateFilter = (filter: K) => {
	if (props.isAutoApply) applyFilters()
	props.filtersFeatureStore.applySelectedFilter(filter)
}

const resetFilters = () => { props.filtersFeatureStore.resetSelectedFilters() }

const applyFilters = () => { emit("apply") }

const filterEmits: FilterEmits<K> = props.isAutoApply
	? { updateFilter, resetFilters }
	: { updateFilter, resetFilters, applyFilters }
</script>

<template>
	<slot 
		name="filters_list" 
		:filterEmits="filterEmits">
	</slot>
</template>