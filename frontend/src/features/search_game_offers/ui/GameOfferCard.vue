<script setup lang="ts">
import type { Offer } from '@/entities/domain_stores/model/Offer'
import { TypeFilter } from '@/features/filters/interface/FiltersStore'
import { useRouter } from 'vue-router'
import { useGamesFilters } from '@/features/filters/stores/useGamesFilters'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'

const router = useRouter()

const props = defineProps<{ offer: Offer }>()

const handleStoreClick = () => {
	const gamesFilters = useGamesFilters()

	gamesFilters.resetSelectedFilters()
	gamesFilters.applyAvailableFilter?.({ 
		name: "stores", 
		type: TypeFilter.MultiSelectorString,  
		value: props.offer.store, 
		isActive: true
	})

	searchGamesStore.resetData()

	router.back()
}

const handleCardClick = () => {
	window.open(props.offer.store_game_link)
}
</script>

<template>
	<div class="game_offer_card">
		<button class="button_store" @click="handleStoreClick">{{ props.offer.store }}</button>
		<div class="price" @click="handleCardClick">{{ props.offer.price_discount }}<span class="price--highlight">₽</span></div>
		<button class="button_buy" @click="handleCardClick">купить</button>
	</div>
</template>

<style scoped>
.game_offer_card {
	display: grid;
	justify-items: center;
	align-items: center;
	text-align: center;
	grid-template-columns: var(--gtc_game_offer_card);
	grid-template-rows: var(--gtr_game_offer_card);
	width: 100%;
	border: 4px solid var(--c_card-bg);
	background-color: var(--c_card-bg);
	font-size: var(--fs_game_offer_card);
}

.button_store,
.button_buy {
	align-self: stretch;
	width: 100%;
	height: 100%;
	border: none;
	font-family: 'Press Start 2P', sans-serif;
	font-size: var(--fs_game_offer_card);
	cursor: pointer;
}

.button_store {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	background-color: var(--c_card-bg);
	color: var(--c_secondary2-accent);
}

.price {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	pointer-events: none;
	color: var(--c_text);
	background-color: var(--c_bg);
}
.price--highlight {
	padding: 0 0 0 calc(var(--fs_game_offer_card) / 2)
}

.button_buy {
	background-color: var(--c_highlight-accent);
	transition: color 0.1s ease-out;
}

.button_buy:active,
.price:active {
	color: var(--c_text);
}

@media (max-width: 1024px) {
	.button_buy {
		display: none
	}
	.price {
		pointer-events: all;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--c_highlight-accent);
		color: var(--c_bg);
		transition: color 0.1s ease-out;
		cursor: pointer;
	}
	.price--highlight {
		padding: 0;
	}
}
</style>