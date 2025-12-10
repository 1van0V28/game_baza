<script setup lang="ts">
import { useGamesFilters } from '@/features/filters/stores/useGamesFilters'
import { useRouter } from 'vue-router'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import { Routes } from '@/app/router'
import { gamesCountExportRef } from '../refs/componentRefs'
import { filtersQueryBuilder } from '@/features/filters/lib/filtersQueryBuilder'
import { gamesFiltersDefinition } from '../definitions/filtersDefinitions'
import { onMounted } from 'vue'
import { gamesStore } from '@/entities/domain_stores/stores/domainStores'
import GamesCard from '@/features/search_games/ui/GamesCard.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'

const gamesFilters = useGamesFilters()

const router = useRouter()

const handleCardClick = (gameID: string) => {
	router.push({ name: Routes.game, params: { gameID: gameID }})
}

const handleLoadMessageOverClick = () => {
	if (!gamesCountExportRef.value) return

	gamesCountExportRef.value.scrollIntoView({
		behavior: "smooth",
		block: "center"
	})
}

const handleLoadButtonClick = () => {
	const filtersQuery = filtersQueryBuilder(gamesFilters.selectedFilters.value, gamesFiltersDefinition)
	searchGamesStore.searchGames(filtersQuery)
}

onMounted(() => {
	if (gamesStore.data.value) return

	const filtersQuery = filtersQueryBuilder(gamesFilters.selectedFilters.value, gamesFiltersDefinition)
	searchGamesStore.searchGames(filtersQuery)
})
</script>

<template>
	<div class="games_gallary">
		<GamesCard v-for="game in gamesStore.data.value?.items"
			@click="() => { handleCardClick(game.id) }"
			:key="game.id"
			:game="game"/>
		
		<div class="load_container">
			<template v-if="gamesStore.isPending.value">
				<div class="load_indicator">
					<LoadIndicator :is-short="false"/>
				</div>
			</template>

			<template v-else-if="gamesStore.data.value?.has_more">
				<button class="load_button" @click="handleLoadButtonClick">хочу ещё!</button>
			</template>

			<template v-else>
				<p class="load_message--over" @click="handleLoadMessageOverClick">GAMES OVER</p>
			</template>
		</div>
	</div>
</template>

<style scoped>
.games_gallary {
	display: grid;
	grid-template-columns: var(--gtc_games_gallary);
	place-items: center;
	gap: var(--gap_games_gallary);
	width: 100%;
}

.load_container {
	display: flex;
	justify-content: center;
	grid-column: 1 / -1;
	grid-row: auto;
	width: 100%;
	height: auto;
}

.load_indicator,
.load_button {
	padding: calc(var(--fs_load_indicator) / 2) var(--fs_load_indicator);
}

.load_button {
	width: var(--w_games_gallary__load_button);
	border: none;
	background-color: var(--c_highlight-accent);
	font-family: "Press Start 2P", sans-serif;
	font-size: var(--fs_load_indicator);
	cursor: pointer;
	transition: color 0.1s ease-out, scale 0.1s ease-out;
}
.load_button:active {
	color: var(--c_text);
	scale: 0.9;
}

.load_message--over {
	font-size: var(--fs_load_indicator);
	text-decoration: underline;
	color: var(--c_placeholder);
	cursor: pointer;
}
</style>