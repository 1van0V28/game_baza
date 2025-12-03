<script setup lang="ts">
import type { Offer } from '@/entities/domain_stores/model/Offer'
import { useGameInfo } from '@/features/game_info/stores/useGameInfo'
import { useGameOffersFilters } from '@/features/filters/stores/useGameOffersFilters'
import { ref, onMounted } from 'vue'
import { gamePreview } from '@/features/game_info/stores/gamePreview'
import { mockOffersData } from '@/entities/domain_stores/api/mockOffers'
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GameInfo from '@/widgets/game_info/ui/GameInfo.vue'
import GameOffersFiltersBlock from '@/widgets/game_offers/ui/GameOffersFiltersBlock.vue'
import GameOffers from '@/widgets/game_offers/ui/GameOffers.vue'

const props = defineProps<{ gameID: string }>()

const gameOffers = ref<Offer[]>()

const gameInfo = useGameInfo(props.gameID)
const gameOffersFiltersStore = useGameOffersFilters()

onMounted(async () => {
	if (props.gameID == gamePreview.value?.id) return

	gameInfo.updateGamePreview()
	gameInfo.fetchGameInfo()

	setTimeout(() => { gameOffers.value = mockOffersData}, 2000)
})
</script>

<template>
	<HomeHeader />
	<div class="page_container">
		<GameInfo />
		<section class="display">
			<h1 class="game_offers_title">ПРЕДЛОЖЕНИЯ</h1>
			<GameOffersFiltersBlock :game-offers-filters-store="gameOffersFiltersStore" />
			<GameOffers 
				:offers="gameOffers" 
				:game-offers-selected-filters="gameOffersFiltersStore.selectedFilters.value" />
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