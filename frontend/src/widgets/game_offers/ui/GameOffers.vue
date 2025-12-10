<script setup lang="ts">
import type {  SelectedFiltersStore, GameOffersSelectedFiltersState } from '@/features/filters/interface/FiltersStore'
import { gameOffersRefKey, gameOffersExportRef } from '@/widgets/game_info/refs/componentRefs'
import { computed, useTemplateRef, watch } from 'vue'
import { useSortedFilter } from '../lib/useSortedFilter'
import { gameInfoStore } from '@/entities/domain_stores/stores/domainStores'
import GameOfferCard from '@/features/search_game_offers/ui/GameOfferCard.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'

const props = defineProps<{ gameOffersSelectedFilters: SelectedFiltersStore<GameOffersSelectedFiltersState>}>()

const offersSorted = computed(() => useSortedFilter(props.gameOffersSelectedFilters, gameInfoStore.data.value?.offers))

const gameOffersRef = useTemplateRef<HTMLElement>(gameOffersRefKey)

watch(gameOffersRef, () => { gameOffersExportRef.value = gameOffersRef.value })
</script>

<template>
	<div class="game_offers" :class="{ game_offers_load: !offersSorted.value }" :ref="gameOffersRefKey">
		<template v-if="offersSorted.value">
			<GameOfferCard  v-for="offer in offersSorted.value" 
				:key="offer.store_game_link"
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