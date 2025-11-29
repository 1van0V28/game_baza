<script setup lang="ts">
import FiltersBlock from '@/features/filters/wrap/FiltersBlock.vue'
import GamesMonoSelectorFilter from '../filters/GamesMonoSelectorFilter.vue'
import GamesMultiSelectorFilter from '../filters/GamesMultiSelectorFilter.vue'
import { useGamesFilters } from '@/features/filters/stores/useGamesFilters'
import { searchGamesFiltersStore } from '@/features/filters/stores/filtersStores'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import { gamesMonoSelectors, gamesMultiSelectors } from '../definitions/filtersDefinitions'
import { computed, onMounted } from 'vue'

const gamesFiltersStore = useGamesFilters()

const gamesAvailableFilters = computed(() => gamesFiltersStore.availableFilters.value)
const gamesSelectedFilters = computed(() => searchGamesFiltersStore.filters.value)

const handleFiltersApply = () => {
	searchGamesStore.searchGame("")
}

onMounted(() => {
	gamesFiltersStore.fetchAvailableFilters()
})
</script>

<template>
	<FiltersBlock 
		:filters-feature-store="gamesFiltersStore"
		:is-auto-apply="false"
		:is-auto-closed="true" 
		@apply="handleFiltersApply">
		<template #filters_list="{ filterEmits }">
			<div class="filters_list">
				<GamesMonoSelectorFilter v-for="filter in gamesMonoSelectors"
					:key="filter.name"
					:name="filter.name"
					:values="filter.values"
					:model-value="gamesSelectedFilters[filter.name]"
					:model-active="filterEmits.modelActive"
					:default-value="filter.defaultValue"
					:reset-behavior="filter.resetBehavior"

					:update-filter="filterEmits.updateFilter"
					:toggle-filter="filterEmits.toggleFilter"
					/>
				
				<GamesMultiSelectorFilter v-for="filter in gamesMultiSelectors"
					:key="filter.name"
					:name="filter.name"
					:values="gamesAvailableFilters?.[filter.name]"
					:model-value="gamesSelectedFilters[filter.name]"
					:model-active="filterEmits.modelActive"
					:label="filter.label"
					:reset-behavior="filter.resetBehavior"
					
					:update-filter="filterEmits.updateFilter"
					:toggle-filter="filterEmits.toggleFilter"
					/>
					
				<button @click="filterEmits.resetFilters" class="button_clear">Очистить</button>
				<button @click="filterEmits.applyFilters" class="button_apply">Применить</button>
			</div>
		</template>
	</FiltersBlock>
</template>

<style scoped>
.filters_list {
	padding: 1.5rem 0 var(--p_games_catalog);
	display: grid;
	grid-template-columns: var(--gtc_games_gallary);
	gap: var(--gap_games_gallary);
	width: 100%;
}

.button_clear,
.button_apply {
	padding: 0.5rem;
	border: none;
	font-size: var(--fs_filter_button);
	font-family: "Press Start 2P", sans-serif;
	cursor: pointer;
	transition: color 0.1s ease-out, 
				transform 0.1s ease-out;
}

.button_clear {
	grid-column: var(--gc_games__button_clear);
	grid-row: 1;
	background-color: transparent;
	color: var(--c_secondary2);
}
.button_clear:active {
	color: var(--c_secondary2-accent);
}

.button_apply {
	padding: 0.5rem;
	grid-column: var(--gc_button_apply);
	grid-row: 1;
	background-color: var(--c_highlight-accent);
	transition: color 0.1s ease-out, 
				transform 0.1s ease-out;
}
.button_apply:active {
	color: var(--c_text);
	transform: scale(0.9);
}
</style>