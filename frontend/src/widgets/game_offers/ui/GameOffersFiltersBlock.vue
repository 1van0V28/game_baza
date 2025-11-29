<script setup lang="ts">
import { useGameOffersFilters } from '@/features/filters/stores/useGameOffersFilters'
import { gameOffersMonoSelectorsString, gameOffersMonoSelectorsRange, gameOffersMultiSelectors } from '../definitions/filtersDefinitions'
import { computed, onMounted } from 'vue'
import FiltersBlock from '@/features/filters/wrap/FiltersBlock.vue'
import GameOffersMonoSelectorStringFilter from '../filters/GameOffersMonoSelectorStringFilter.vue'
import GameOffersMonoSelectorRangeFilter from '../filters/GameOffersMonoSelectorRangeFilter.vue'
import GameOffersMultiSelectorFilter from '../filters/GameOffersMultiSelectorFilter.vue'

const gameOffersFiltersStore = useGameOffersFilters()

const gameOffersAvailableFilters = computed(() => gameOffersFiltersStore.availableFilters)
const gameOffersSelectedFilters = computed(() => gameOffersFiltersStore.selectedFilters)

onMounted(() => {
	gameOffersFiltersStore.fetchAvailableFilters()
})
</script>

<template>
	<FiltersBlock
		:filters-feature-store="gameOffersFiltersStore"
		:is-auto-apply="true"
		:is-auto-closed="true">
		<template #filters_list="{ filterEmits }">
			<div class="filters_list">
				<GameOffersMonoSelectorStringFilter v-for="filter in gameOffersMonoSelectorsString"
					:key="filter.name"
					:name="filter.name"
					:values="filter.values"
					:model-value="gameOffersSelectedFilters?.value[filter.name]"
					:model-active="filterEmits.modelActive"
					:default-value="filter.defaultValue"
					:reset-behavior="filter.resetBehavior"

					:update-filter="filterEmits.updateFilter"
					:toggle-filter="filterEmits.toggleFilter"/>

				<GameOffersMonoSelectorRangeFilter v-for="filter in gameOffersMonoSelectorsRange"
					:key="filter.name"
					:name="filter.name"
					:values="filter.values"
					:model-value="gameOffersSelectedFilters?.value[filter.name]"
					:model-active="filterEmits.modelActive"
					:default-value="filter.defaultValue"
					:label="filter.label"
					:reset-behavior="filter.resetBehavior"

					:update-filter="filterEmits.updateFilter"
					:toggle-filter="filterEmits.toggleFilter"/>

				<GameOffersMultiSelectorFilter v-for="filter in gameOffersMultiSelectors"
					:key="filter.name"
					:name="filter.name"
					:values="gameOffersAvailableFilters.value?.[filter.name]"
					:model-value="gameOffersSelectedFilters?.value[filter.name]"
					:model-active="filterEmits.modelActive"
					:label="filter.label"
					:reset-behavior="filter.resetBehavior"
					
					:update-filter="filterEmits.updateFilter"
					:toggle-filter="filterEmits.toggleFilter"
					/>

				<button @click="filterEmits.resetFilters" class="button_clear">Очистить</button>
			</div>
		</template>
	</FiltersBlock>
</template>

<style scoped>
.filters_list {
	padding: 0 0 var(--p_games_catalog);
	display: grid;
	grid-template-columns: var(--gtc_games_gallary);
	gap: var(--gap_games_gallary);
	width: 100%;
}

.button_clear{
	padding: 0.5rem;
	border: none;
	font-size: var(--fs_filter_button);
	font-family: "Press Start 2P", sans-serif;
	cursor: pointer;
	transition: color 0.1s ease-out, 
				transform 0.1s ease-out;
}
.button_clear {
	grid-column: var(--gc_game_offers__button_clear);
	grid-row: 1;
	background-color: transparent;
	color: var(--c_secondary2);
}
.button_clear:active {
	color: var(--c_secondary2-accent);
}
</style>