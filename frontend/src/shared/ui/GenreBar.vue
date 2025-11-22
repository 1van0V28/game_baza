<script setup lang="ts">
const props = defineProps<{ name: string | undefined }>()
</script>

<template>
	<div class="genre_bar" v-if="props.name">
		{{ props.name }}
	</div>
	<div v-else class="genre_bar_skeleton"></div>
</template>

<style scoped>
.genre_bar {
	padding: var(--p_genre_bar);
	background-color: var(--c_card-bg);
	font-size: var(--fs_genre_bar);
	color: var(--c_secondary2-accent);
}

.genre_bar_skeleton {
	height: calc(var(--fs_genre_bar) + 2 * var(--p_genre_bar));
	width: 10rem;
	background-color: var(--c_card-bg);
	
	animation-name: skeleton_animation;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
}
@keyframes skeleton_animation {
	50% {
		background-color: var(--c_card-bg--accent);
	}
	100% {
		background-color: var(--c_card-bg);
	}
}
</style>