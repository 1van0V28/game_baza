<script setup lang="ts">
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GamesFiltersBlock from '@/widgets/gallary/ui/GamesFiltersBlock.vue'
import GamesGallary from '@/widgets/gallary/ui/GamesGallary.vue'
import { gamesStore } from '@/entities/domain_stores/stores/domainStores'
</script>

<template>
	<HomeHeader />
	<section class="games_catalog">
		<h2 class="games_count">
			КАТАЛОГ ИГР
			<span class="games_count--highlight">{{ gamesStore.data.value?.gamesCount ?? 0 }}</span>
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
</style>