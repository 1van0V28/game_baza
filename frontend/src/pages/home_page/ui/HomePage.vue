<script setup lang="ts">
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GamesFiltersBlock from '@/widgets/gallary/ui/GamesFiltersBlock.vue'
import GamesGallary from '@/widgets/gallary/ui/GamesGallary.vue'
</script>

<template>
	<HomeHeader />
	<section class="games_catalog">
		<h2 class="games_count">
			КАТАЛОГ ИГР
			<span class="games_count--highlight">128</span>
		</h2>

		<GamesFiltersBlock/>
		<GamesGallary />
	</section>
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
.games_count--highlight {
	color: var(--c_highlight-accent);
}

.filters_block {
	display: grid;
	grid-template-columns: var(--gtc_games_gallary);
}

.button_clear {
	padding: 0.5rem;
	background-color: transparent;
	border: 4px solid var(--c_secondary2);
	font-size: 1.25rem;
	font-family: "Press Start 2P", sans-serif;
	color: var(--c_secondary2);
	cursor: pointer;
	transition: color 0.1s ease-out, 
				border-color 0.1s ease-out, 
				transform 0.1s ease-out;
}
.button_clear:active {
	color: var(--c_secondary2-accent);
	border-color: var(--c_secondary2-accent);
	transform: scale(0.9);
}
</style>