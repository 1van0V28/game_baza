<script setup lang="ts">
import { gamePreview } from '@/features/game_info/stores/gamePreview'
import { gameInfoStore } from '@/entities/domain_stores/stores/domainStores'
import { computed } from 'vue'
import TextSkeleton from '@/shared/ui/TextSkeleton.vue'
import GenreBar from '@/shared/ui/GenreBar.vue'
import DescriptionContainer from '@/shared/ui/DescriptionContainer.vue'

const gameInfo = computed(() => {
	return {
		imgURL: gamePreview.value?.imgURL ?? gameInfoStore.data.value?.imgURL,
		title: gamePreview.value?.title ?? gameInfoStore.data.value?.title,
		minPrice: gameInfoStore.data.value?.minPrice,
		genres: gameInfoStore.data.value?.genres,
		description: gameInfoStore.data.value?.description
	}
})
const isImageHidden = computed(() => (!gameInfo.value.imgURL && gameInfoStore.isPending) )
</script>

<template>
	<section class="game_info">
		<div class="card_container">
			<div 
				class="image_container" 
				:class="{ image_container_loaded: gameInfo.imgURL, image_container_skeleton: !gameInfo.imgURL }">
				<img 
					class="image"
					:class="{ image_hidden: isImageHidden }"
					:src="gameInfo.imgURL"
					alt="Обложка игры"
				>
			</div>
			
			<div class="main_info">
				<h1 class="title" v-if="gameInfo.title">
					{{ gameInfo.title }}
				</h1>
				
				<div class="title_skeleton_container" v-else>
					<TextSkeleton class="title__skeleton"/>
					<TextSkeleton class="title__skeleton title__skeleton--half"/>
				</div>	

				<div class="min_price">
					от<span class="min_price--highlight">{{ gameInfo.minPrice }}<TextSkeleton v-if="!gameInfo.minPrice" class="min_price__skeleton"/><span :class="{ min_price__value: !gameInfo.minPrice }">₽</span></span>
				</div>

				<button class="button_scroll">Смотреть предложения ↓</button>
			</div>
		</div>

		<div class="genre_list">
			Жанр:
			<template v-if="gameInfo.genres">
				<GenreBar v-for="genreName in gameInfo.genres"
					:key="genreName"
					:name="genreName"/>
			</template>
			<template v-else>
				<GenreBar :name="undefined"/>
				<GenreBar :name="undefined"/>
			</template>
		</div>

		<div class="description_container">
			Описание:
			<DescriptionContainer :description="gameInfo.description"/>
		</div>
	</section>
</template>

<style scoped>
.game_info {
	--fs_subtitle: 1.25rem;
	--lh_title: 1.2;

	margin: var(--h_header) 0 0;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.card_container {
	display: grid;
	grid-template-columns: var(--gtc_game_info);
	gap: var(--gap_game_info);
}


.image_container {
	position: relative;
	width: 100%;
	aspect-ratio: 4 / 5;
	border: 4px solid var(--c_card-bg);
	transition: border-color 2s ease-in-out,
				box-shadow 2s ease-in-out;
}
.image_container_skeleton {
	animation: image_border_skeleton_animation 1s ease-in-out infinite;
}
@keyframes image_border_skeleton_animation {
	50% {
		border-color: var(--c_card-bg--accent);
	}
	100% {
		border-color: var(--c_card-bg);
	}
}
.image_container_loaded {
	border-color: rgba(255, 204, 51, 1);
	box-shadow:
		0 0 4px rgba(255, 204, 51, 1),
		0 0 14px rgba(255, 204, 51, 0.9),
		0 0 26px rgba(255, 204, 51, 0.6),
		0 0 36px rgba(255, 204, 51, 0.35);
}
.image_container::before {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		transparent 0%,
		rgba(255, 255, 255, 0.05) 40%,
		rgba(255, 255, 255, 0.14) 50%,
		rgba(255, 255, 255, 0.05) 60%,
		transparent 100%
	);
	background-size: 400% 400%;
	background-repeat: no-repeat;
	filter: blur(20px);
	animation: image_skeleton_animation 4s ease-in-out infinite;
	transition: opacity 0.2s ease-in-out;
}
.image_container.image_container_skeleton::before {
	opacity: 0;
}
@keyframes image_skeleton_animation {
	0% {
		background-position: 180% 180%;
	}
	100% {
		background-position: -80% -80%;
	}
}


.image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}
.image_hidden {
	display: none;
}


.main_info {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	color: var(--c_text);
	text-wrap: wrap;
}


.title {
	font-size: var(--fs_main_info);
	line-height: var(--lh_title);
}
.title_skeleton_container {
	display: flex;
	flex-direction: column;
	gap: calc(var(--fs_main_info) * var(--lh_title) - var(--fs_main_info));
}
.title__skeleton {
	height: var(--fs_main_info);
}
.title__skeleton--half {
	width: 50%;
}


.min_price {
	margin: 1rem 0 0 0;
	font-size: calc(var(--fs_main_info) / 1.5);
}
.min_price--highlight {
	display: flex;
	align-items: flex-end;
	margin: 0 0 0 calc(var(--fs_main_info) / 4);
	display: inline-flex;
	gap: calc(var(--fs_main_info) / 4);
	font-size: var(--fs_main_info);
}
.min_price__skeleton {
	display: inline-block;
	width: calc(var(--fs_main_info) * 3);
	height: var(--fs_main_info);
}
.min_price__value {
	display: inline-block; 
	animation: min_price_skeleton_animation 0.5s ease-out infinite;
}
@keyframes min_price_skeleton_animation {
	50% {
		transform: translateY(-80%);
	}
	100% {
		transform: translateY(0%);
	}
}


.button_scroll {
	padding: 0.5rem;
	border: none;
	width: var(--w_game_info__button_scroll);
	font-family: "Press Start 2P", sans-serif;
	font-size: 0.9rem;
	cursor: pointer;
	transition: color 0.1s ease-out;
	background-color: var(--c_highlight-accent);
}
.button_scroll:active {
	color: var(--c_text)
}


.genre_list {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
	color: var(--c_text);
	font-size: var(--fs_subtitle);
}

.description_container {
	width: var(--w_game_info__description);
	color: var(--c_text);
	font-size: var(--fs_subtitle);
}
</style>