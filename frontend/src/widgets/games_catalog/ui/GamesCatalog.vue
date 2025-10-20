<script setup lang="ts">
import FiltersBlock from '@/widgets/games_catalog/ui/FiltersBlock.vue'
import GamesGallary from '@/widgets/games_catalog/ui/GamesGallary.vue'
import SelectorFilter from '@/shared/ui/SelectorFilter.vue'
</script>


<template>
	<FiltersBlock>
		<template #filters_list>
			<SelectorFilter />
		</template>
	</FiltersBlock>
	<GamesGallary />
</template>