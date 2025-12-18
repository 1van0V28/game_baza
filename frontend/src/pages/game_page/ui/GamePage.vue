<script setup lang="ts">
import { useGameInfo } from '@/features/game_info/stores/useGameInfo'
import { useGameOffersFilters } from '@/features/filters/stores/useGameOffersFilters'
import { onMounted } from 'vue'
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GameInfo from '@/widgets/game_info/ui/GameInfo.vue'
import GameOffersFiltersBlock from '@/widgets/game_offers/ui/GameOffersFiltersBlock.vue'
import GameOffers from '@/widgets/game_offers/ui/GameOffers.vue'

const props = defineProps<{ gameID: string }>()

const gameInfo = useGameInfo(props.gameID)
const gameOffersFiltersStore = useGameOffersFilters()

onMounted(() => {
	gameInfo.updateGamePreview()
})
</script>

<template>
	<HomeHeader :has-search-bar="true" />
	<div class="page_container">
		<GameInfo :game-info="gameInfo.gameInfo.value"/>
		<section class="display">
			<h1 class="game_offers_title">ПРЕДЛОЖЕНИЯ</h1>
			<GameOffersFiltersBlock :game-offers-filters-store="gameOffersFiltersStore" />
			<GameOffers :game-offers-selected-filters="gameOffersFiltersStore.selectedFilters.value" />
		</section>
	</div>
</template>

<style scoped>
.page_container {
	padding: var(--p_game_page_container);
}

.game_offers_title {
	padding: var(--p_games_catalog) 0 1.5rem;
	font-size: var(--fs_game_offers_title);
	color: var(--c_highlight-accent);
}
</style>