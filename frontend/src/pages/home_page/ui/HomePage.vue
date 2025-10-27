<script setup lang="ts">
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import FiltersBlock from '@/widgets/filters/ui/FiltersBlock.vue'
import SelectorFilter from '@/shared/ui/SelectorFilter.vue'
import GamesGallary from '@/widgets/gallary/ui/GamesGallary.vue'
</script>


<template>
	<HomeHeader />
	<section class="games_catalog">
		<h2>
			КАТАЛОГ ИГР
			<span>128</span>
		</h2>

		<FiltersBlock>
			<template #filters_list>
				<SelectorFilter />
			</template>
		</FiltersBlock>

		<GamesGallary />
	</section>
</template>

<style scoped>
.games_catalog {
	margin: var(--h_header) 0 0 0;
	display: flex;
	flex-direction: column;
	flex: 1;
}
</style>