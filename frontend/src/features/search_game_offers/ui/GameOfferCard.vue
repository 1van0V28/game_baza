<script setup lang="ts">
import type { Offer } from '@/entities/domain_stores/model/Offer'

const props = defineProps<{ offer: Offer }>()

const handleCardClick = () => {
	window.open(props.offer.offerURL)
}
</script>

<template>
	<div class="game_offer_card">
		<img 
			class="store_image"
			alt="Логотип магазина"
			:src="props.offer.imgStoreURL"
		/>
		<p class="platform">{{ props.offer.platform }}</p>
		<div class="price" @click="handleCardClick">{{ props.offer.price }}<span class="price--highlight">₽</span></div>
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
	gap: 0.5rem;
	width: 100%;
	background-color: var(--c_card-bg);
	font-size: var(--fs_game_offer_card);
}

.store_image {
	width: 75%;
	height: 75%;
	object-fit: contain;
	object-position: center;
}

.platform {
	color: var(--c_secondary2-accent);
}

.price {
	pointer-events: none;
	color: var(--c_text);
}
.price--highlight {
	padding: 0 0 0 calc(var(--fs_game_offer_card) / 2)
}

.button_buy {
	align-self: stretch;
	width: 100%;
	height: 100%;
	background-color: var(--c_highlight-accent);
	border: none;
	font-family: 'Press Start 2P', sans-serif;
	font-size: var(--fs_game_offer_card);
	transition: color 0.1s ease-out;
	cursor: pointer;
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