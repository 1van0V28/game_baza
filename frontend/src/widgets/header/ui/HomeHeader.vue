<script setup lang="ts">
import { ref } from 'vue'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import SiteLogo from '@/shared/ui/SiteLogo.vue'
import SearchBar from '@/shared/ui/SearchBar.vue'

const searchInput = ref("")
</script>


<template>
	<div class="header">
		<SiteLogo />
		<SearchBar 
			v-model="searchInput" 
			placeholder="Игра..."
			@search_click="searchGamesStore.searchGame(searchInput)"/>
	</div>
</template>

<style scoped>
.header {
	padding: var(--p_header);
	display: grid;
	grid-template-columns: var(--gtc_header);
	column-gap: 1rem;
	width: 100vw;
	height: var(--h_header);
	place-items: center;
}
</style>