<script setup lang="ts">
import type { Offer } from '@/entities/domain_stores/model/Offer'
import type { GameOffersSelectedFiltersState, SelectedFiltersStore } from '@/features/filters/interface/FiltersStore'
import { gameOffersRefKey, gameOffersExportRef } from '@/widgets/game_info/refs/componentRefs'
import { useTemplateRef, watch, toRef } from 'vue'
import GameOfferCard from '@/features/search_game_offers/ui/GameOfferCard.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'
import { useSortedFilter } from '../lib/useSortedFilter'

const props = defineProps<{ 
	offers?: Offer[],
	gameOffersSelectedFilters: SelectedFiltersStore<GameOffersSelectedFiltersState>
}>()

const offersRef = toRef(props, "offers")
const gameOffersSelectedFilters = toRef(props, "gameOffersSelectedFilters")

const offersSorted = useSortedFilter(gameOffersSelectedFilters, offersRef)

const gameOffersRef = useTemplateRef<HTMLElement>(gameOffersRefKey)

watch(gameOffersRef, () => { gameOffersExportRef.value = gameOffersRef.value })
</script>

<template>
	<div class="game_offers" :class="{ game_offers_load: !offersSorted }" :ref="gameOffersRefKey">
		<template v-if="offers">
			<GameOfferCard  v-for="offer in offersSorted" 
				:key="offer.id"
				:offer="offer" />
		</template>
		<LoadIndicator v-else :is-short="false"/>
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
	height: calc(4 * var(--gtr_game_offer_card) + 3 * var(--gap_game_offers));
	border: 4px solid var(--c_card-bg);
	scrollbar-width: thin;
}
.game_offers_load {
	justify-content: center;
}

.load {
	font-size: var(--fs_title_offers);
}
</style>