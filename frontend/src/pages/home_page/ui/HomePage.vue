<script setup lang="ts">
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'
import GamesFiltersBlock from '@/widgets/gallary/ui/GamesFiltersBlock.vue'
import GamesGallary from '@/widgets/gallary/ui/GamesGallary.vue'
import { useTemplateRef } from 'vue'
import { gamesStore } from '@/entities/domain_stores/stores/domainStores'

const gamesCatalogRef = useTemplateRef<HTMLElement>("games_count")

const handleFloatedButtonClick = () => {
	gamesCatalogRef.value?.scrollIntoView({
		behavior: "smooth",
		block: "center"
	})
}
</script>

<template>
	<HomeHeader :has-search-bar="true" />
	<section class="games_catalog">
		<h2 class="games_count" ref="games_count">
			КАТАЛОГ ИГР
			<span class="games_count--highlighted">
				<LoadIndicator v-if="gamesStore.isPending.value" class="load" :is-short="true"/>
				<template v-else>{{ gamesStore.data.value?.total}}</template>
			</span>
		</h2>

		<GamesFiltersBlock />
		<GamesGallary />
	</section>

	<button class="floated_button" @click="handleFloatedButtonClick">↑</button>
</template>

<style scoped>
.games_catalog {
	margin: var(--h_header) 0 0 0;
	padding: var(--p_games_catalog);
	display: flex;
	flex-direction: column;
	flex: 1;
}

.games_count {
	font-size: 2rem;
	color: var(--c_text);
}
.games_count--highlighted {
	color: var(--c_highlight-accent);
}

.load {
	color: var(--c_highlight-accent);
	animation-name: loading_indicator_animation;
}
@keyframes loading_indicator_animation {
	50% {
		color: var(--c_highlight);
	}
}

.floated_button {
	position: fixed;
	bottom: calc(var(--fs_floated_button) * 1.5);
	right: calc(var(--fs_floated_button) * 1.5);
	padding: calc(var(--fs_floated_button) / 2);
	background-color: var(--c_bg);
	border: 2px solid var(--c_secondary2);
	color: var(--c_secondary2-accent);
	box-shadow:
		0 0 6px var(--c_secondary2),
		0 0 12px var(--c_secondary2),
		0 0 18px var(--c_secondary2),
		0 0 24px var(--c_secondary2),
		0 0 30px rgba(102, 0, 153, 0.4);
	font-size: var(--fs_floated_button);
	font-family: "Press Start 2P", sans-serif;
	color: var(--c_secondary2);
	transition: color 0.1s ease-out,
				box-shadow 0.1s ease-out;
	cursor: pointer;
}
.floated_button:active {
	color: var(--c_secondary2-accent);
	box-shadow:
		0 0 10px var(--c_secondary2-accent),
		0 0 20px var(--c_secondary2-accent),
		0 0 30px var(--c_secondary2-accent),
		0 0 40px var(--c_secondary2-accent),
		0 0 50px rgba(153, 51, 204, 0.7),
		0 0 60px rgba(153, 51, 204, 0.4);
}
</style>