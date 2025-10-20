<script setup lang="ts">
import SiteLogo from '@/shared/ui/SiteLogo.vue'
import SearchWarp from '@/features/search/wrap/SearchWarp.vue'
import SearchBar from '@/shared/ui/SearchBar.vue'
</script>


<template>
	<div>
		<SiteLogo/>
		
		<SearchWarp>
			<template #search_bar>
				<SearchBar/>
			</template>
		</SearchWarp>
	</div>
</template>