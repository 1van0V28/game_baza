<script setup lang="ts">
import { useGameInfo } from '@/features/game_info/stores/useGameInfo'
import { onMounted, ref } from 'vue'
import { gamePreview } from '@/features/game_info/stores/gamePreview'
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GameInfo from '@/widgets/game_info/ui/GameInfo.vue'
import GameOffers from '@/widgets/game_offers/ui/GameOffers.vue'
import type { Offer } from '@/entities/domain_stores/model/Offer'
import { mockOffersData } from '@/entities/domain_stores/api/mockOffers'

const props = defineProps<{ gameID: string }>()

const gameOffers = ref<Offer[]>()

const gameInfo = useGameInfo(props.gameID)

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
		<section>
			<h1>ПРЕДЛОЖЕНИЯ</h1>
			<GameOffers :offers="gameOffers"/>
		</section>
	</div>
</template>

<style scoped>
.page_container {
	padding: var(--p_game_page_container);
}
</style>