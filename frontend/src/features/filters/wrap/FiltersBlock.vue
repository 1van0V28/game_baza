<script setup lang="ts" generic="T extends SelectedFiltersStates">
import type { 
	SelectedFiltersStates,
	IBaseFiltersFeatureStore, 
	SelectedFilterUpdate, 
	FilterEmits
} from '../interface/FiltersStore'
import { shallowRef } from 'vue'
import { getOpenedFiltersAuto, getOpenedFilters } from '../lib/filtersToggle'

const props = defineProps<{ 
	filtersFeatureStore: IBaseFiltersFeatureStore<T>,
	isAutoApply: boolean,
	isAutoClosed: boolean
}>()

const openedFilters = shallowRef<Record<SelectedFilterUpdate<T>["name"], true>>({} as Record<SelectedFilterUpdate<T>["name"], true>)

const emit = defineEmits(["apply"])

const updateFilter = (filter: SelectedFilterUpdate<T>) => {
	if (props.isAutoApply) applyFilters()
	props.filtersFeatureStore.applySelectedFilter(filter)
}

const resetFilters = () => { 
	props.filtersFeatureStore.resetSelectedFilters()
	openedFilters.value = {} as Record<SelectedFilterUpdate<T>["name"], true>
}

const applyFilters = () => { emit("apply") }

const toggleFilter = (filterName: SelectedFilterUpdate<T>["name"]) => { 
	if (props.isAutoClosed) {
		openedFilters.value = getOpenedFiltersAuto(openedFilters.value, filterName)
	} else {
		openedFilters.value = getOpenedFilters(openedFilters.value, filterName)
	}
}

const filterEmits: FilterEmits<T> = props.isAutoApply
	? { updateFilter, resetFilters, toggleFilter, modelActive: openedFilters }
	: { updateFilter, resetFilters, applyFilters, toggleFilter, modelActive: openedFilters }
</script>

<template>
	<slot 
		name="filters_list" 
		:filterEmits="filterEmits">
	</slot>
</template>