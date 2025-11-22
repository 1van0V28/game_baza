<script setup lang="ts">
import { useGameInfo } from '@/features/game_info/stores/useGameInfo'
import { onMounted } from 'vue'
import { gamePreview } from '@/features/game_info/stores/gamePreview'
import HomeHeader from '@/widgets/header/ui/HomeHeader.vue'
import GameInfo from '@/widgets/game_info/ui/GameInfo.vue'

const props = defineProps<{ gameID: string }>()

const gameInfo = useGameInfo(props.gameID)

onMounted(async () => {
	if (props.gameID == gamePreview.value?.id) return

	gameInfo.updateGamePreview()
	gameInfo.fetchGameInfo()
})
</script>

<template>
	<HomeHeader />
	<div class="page_container">
		<GameInfo />
	</div>
</template>

<style scoped>
.page_container {
	padding: var(--p_game_page_container);
}
</style>