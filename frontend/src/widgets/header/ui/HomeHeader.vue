<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGamesFilters } from '@/features/filters/stores/useGamesFilters'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import { Routes } from '@/app/router'
import { TypeFilter } from '@/features/filters/interface/FiltersStore'
import { filtersQueryBuilder } from '@/features/filters/lib/filtersQueryBuilder'
import { searchGamesFiltersStore } from '@/features/filters/stores/filtersStores'
import { gamesFiltersDefinition } from '@/widgets/gallary/definitions/filtersDefinitions'
import SiteLogo from '@/shared/ui/SiteLogo.vue'
import SearchBar from '@/shared/ui/SearchBar.vue'

const props = defineProps<{ hasSearchBar: boolean }>()

const searchInput = ref("")

const route = useRoute()
const router = useRouter()

const gamesFilters = useGamesFilters()

const handleSearch = () => {
	if (!gamesFilters.selectedFilters.value.title) return

	searchGamesStore.resetData()

	if (route.name != Routes.home) {
		searchInput.value = gamesFilters.selectedFilters.value.title
		gamesFilters.resetSelectedFilters()
		gamesFilters.applySelectedFilter({
			name: "title",
			type: TypeFilter.MonoSelectorString,
			value: searchInput.value
		})
		router.back()
	} else {
		const filtersQuery = filtersQueryBuilder(searchGamesFiltersStore.filters.value, gamesFiltersDefinition)
		searchGamesStore.searchGames(filtersQuery)
	}
}
</script>

<template>
	<div class="header">
		<SiteLogo />
		<SearchBar v-if="props.hasSearchBar"
			v-model="gamesFilters.selectedFilters.value.title" 
			placeholder="Игра..."
			@search_click="handleSearch"/>
	</div>
</template>

<style scoped>
.header {
	z-index: 10;
	position: fixed;
	padding: var(--p_header);
	display: grid;
	grid-template-columns: var(--gtc_header);
	column-gap: 1rem;
	width: 100vw;
	height: var(--h_header);
	place-items: center;
  	background-color: rgba(11, 13, 23, 0.7);
  	border-bottom: 2px solid var(--c_secondary2); 
  	box-shadow: 0 0 10px var(--c_secondary2), 
				0 0 20px var(--c_secondary2);
  	backdrop-filter: blur(4px);
  	-webkit-backdrop-filter: blur(4px);
}
</style>