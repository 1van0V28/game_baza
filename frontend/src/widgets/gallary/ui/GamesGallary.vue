<script setup lang="ts">
import { gamesStore } from '@/entities/domain_stores/stores/domainStores'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import GamesCard from '@/features/search_games/ui/GamesCard.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'
</script>

<template>
	<div class="games_gallary">
		<template v-if="gamesStore.data.value">
			<GamesCard 
				v-for="game in gamesStore.data.value.games"
				:key="game.id"
				:game="game"/>
		</template>
		
		<div class="load_container">
			<div class="load_indicator" v-if="gamesStore.isPending.value">
				<LoadIndicator :is-short="false"/>
			</div>
			<button v-else class="load_button" @click="() => { searchGamesStore.searchGame('') }">хочу ещё!</button>
			<!-- <p class="load_message--over">GAMES OVER</p> -->
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
}
</style>