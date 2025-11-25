<script setup lang="ts">
import type { Offer } from '@/entities/domain_stores/model/Offer'
import GameOfferCard from '@/features/search_game_offers/ui/GameOfferCard.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'

const props = defineProps<{offers?: Offer[]}>()
</script>

<template>
	<div class="game_offers">
		<template v-if="props.offers">
			<GameOfferCard  v-for="offer in props.offers" 
				:key="offer.id"
				:offer="offer" />
		</template>
		<LoadIndicator v-else class="load" :is-short="false"/>
	</div>
</template>

<style scoped>
.game_offers {
	overflow: auto;
	padding: var(--p_game_offers);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--gap_game_offers);
	width: 100%;
	border: 4px solid var(--c_card-bg);
	scrollbar-width: thin;
}

.load {
	font-size: var(--fs_title_offers);
}
</style>