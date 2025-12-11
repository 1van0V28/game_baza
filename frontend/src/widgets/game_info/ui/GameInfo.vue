<script setup lang="ts">
import type { GameInfo } from '@/entities/domain_stores/model/Game'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { gameOffersExportRef } from '@/widgets/game_info/refs/componentRefs'
import { useGamesFilters } from '@/features/filters/stores/useGamesFilters'
import { TypeFilter } from '@/features/filters/interface/FiltersStore'
import { searchGamesStore } from '@/features/search_games/stores/searchGamesStore'
import TextSkeleton from '@/shared/ui/TextSkeleton.vue'
import GenreBar from '@/shared/ui/GenreBar.vue'
import DescriptionContainer from '@/shared/ui/DescriptionContainer.vue'

const props = defineProps<{ gameInfo: GameInfo }>()

const router = useRouter()

const gamesFilters = useGamesFilters()

const date = computed(() => {
	if (!props.gameInfo.release_date) return

	const date = new Date(props.gameInfo.release_date)
  
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}
	
	return date.toLocaleDateString('ru-RU', options)
})

const handleButtonScrollClick = () => {
	if (!gameOffersExportRef.value) return

	gameOffersExportRef.value.scrollIntoView({
		behavior: "smooth",
		block: "center"
	})
}

const handleGenreBarClick = (genre: string) => {
	gamesFilters.resetSelectedFilters()
	gamesFilters.applyAvailableFilter?.({ 
		name: "genres", 
		type: TypeFilter.MultiSelectorString,  
		value: genre, 
		isActive: true
	})

	searchGamesStore.resetData()

	router.back()
}
</script>

<template>
	<section class="game_info">
		<div class="card_container">
			<div 
				class="image_container" 
				:class="{ image_container_loaded: props.gameInfo.image_url, image_container_skeleton: !props.gameInfo.image_url }">
				<img 
					class="image"
					:class="{ image_hidden: !props.gameInfo.image_url }"
					:src="props.gameInfo.image_url"
					alt="Обложка игры"
				>
			</div>
			
			<div class="main_info">
				<h1 class="title" v-if="props.gameInfo.title">
					{{ props.gameInfo.title }}
				</h1>
				
				<div class="title_skeleton_container" v-else>
					<TextSkeleton class="title__skeleton"/>
					<TextSkeleton class="title__skeleton title__skeleton--half"/>
				</div>	

				<div class="min_price">
					от<span class="min_price--highlight">{{ props.gameInfo.min_price_discount }}<TextSkeleton v-if="!props.gameInfo.min_price_discount" class="min_price__skeleton"/><span :class="{ min_price__value: !props.gameInfo.min_price_discount }">₽</span></span>
				</div>

				<button class="button_scroll" @click="handleButtonScrollClick">Смотреть предложения<span class="button_scroll_arrow">↓</span></button>
			</div>
		</div>

		<div class="subtitle">
			Жанр:
			<template v-if="props.gameInfo.genres">
				<GenreBar v-for="genreName in props.gameInfo.genres"
					@click="() => { handleGenreBarClick(genreName) }"
					:key="genreName"
					:name="genreName"/>
			</template>
			<template v-else>
				<GenreBar :name="undefined"/>
				<GenreBar :name="undefined"/>
			</template>
		</div>

		<div class="subtitle">
			Дата выхода: 
			<span class="subtitle--hightlighted">{{ date }}</span>
			<TextSkeleton v-if="!props.gameInfo.release_date" class="release_date__skeleton"/>
		</div>

		<div class="subtitle">
			Разработчик: 
			<span class="subtitle--accent">{{ props.gameInfo.developer }}</span>
			<TextSkeleton v-if="!props.gameInfo.developer" class="developer__skeleton"/>
		</div>

		<div class="subtitle">
			Издатель: 
			<span class="subtitle--accent">{{ props.gameInfo.publisher }}</span>
			<TextSkeleton v-if="!props.gameInfo.publisher" class="publisher__skeleton"/>
		</div>

		<div class="description_container">
			Описание:
			<DescriptionContainer :description="props.gameInfo.description"/>
		</div>
	</section>
</template>

<style scoped>
.game_info {
	--lh_title: 1.2;

	margin: var(--h_header) 0 0;
	display: flex;
	flex-direction: column;
	gap: var(--gap_game_info);
}

.card_container {
	display: grid;
	grid-template-columns: var(--gtc_game_info);
	gap: var(--gap_game_info);
}


.image_container {
	position: relative;
	width: 100%;
	aspect-ratio: 2.65 / 1;
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
	gap: var(--fs_main_info);
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
	margin: var(--fs_main_info) 0 0 0;
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
	font-size: var(--fs_subtitle);
	cursor: pointer;
	transition: color 0.1s ease-out;
	background-color: var(--c_highlight-accent);
}
.button_scroll:active {
	color: var(--c_text)
}
.button_scroll_arrow {
	padding: 0 0 0 calc(var(--fs_subtitle) / 2);
}

.subtitle {
	display: flex;
	align-items: center;
	column-gap: var(--fs_subtitle);
	row-gap: calc(var(--fs_subtitle) / 2);
	flex-wrap: wrap;
	color: var(--c_text--muted);
	font-size: var(--fs_subtitle);
}
.subtitle--hightlighted,
.subtitle--accent {
	font-size: var(--fs_main_info);
}
.subtitle--hightlighted {
	color: var(--c_text);
}
.subtitle--accent {
	color: var(--c_secondary2-accent);
}

.release_date__skeleton,
.developer__skeleton,
.publisher__skeleton {
	height: var(--fs_main_info);
}
.release_date__skeleton {
	width: calc(var(--fs_main_info) * 16);
}
.developer__skeleton,
.publisher__skeleton {
	width: calc(var(--fs_main_info) * 8);
}

.description_container {
	width: var(--w_game_info__description);
	color: var(--c_text);
	font-size: var(--fs_subtitle);
}
</style>