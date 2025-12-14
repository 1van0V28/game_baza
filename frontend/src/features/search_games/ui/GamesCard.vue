<script setup lang="ts">
import type { GameBase } from '@/entities/domain_stores/model/Game'

const { game } = defineProps<{ game: GameBase }>()
</script>

<template>
	<div class="games_card">
		<img 
			class="game_image"
			alt="обложка игры"
			:src="game.image_url"
			/>
		<div class="info_container">
			<p class="title">{{ game.title }}</p>
			<p v-if="game.min_price_discount == 0">бесплатно</p>
			<p v-else>от<span class="min_price--highlight">{{ game.min_price_discount }}₽</span></p>
		</div>
	</div>
</template>

<style scoped>
.games_card {
	--fs_info: 0.8rem;

	overflow: hidden;
	display: flex;
	flex-direction: column;
	aspect-ratio: var(--ar_games_card__image);
	width: 100%;
	border: 4px solid var(--c_highlight-accent);
	box-shadow: 
		0 0 2px rgba(255, 204, 51, 0.8),
		0 0 6px rgba(255, 204, 51, 0.4);
	background-color: var(--c_card-bg);
	color: var(--c_text);
	cursor: pointer;
}

.game_image {
	width: 100%;
	object-fit: cover;
	object-position: center;
	aspect-ratio: 2.65 / 1;
}

.info_container {
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	font-size: var(--fs_info);
	box-shadow: 0 -8px 16px rgba(26, 29, 46, 0.8);
}

.title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
}

.min_price--highlight {
	padding: 0 0 0 calc(var(--fs_info) / 2);
	font-size: 1rem;
}
</style>