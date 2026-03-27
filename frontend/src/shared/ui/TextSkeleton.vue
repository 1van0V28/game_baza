<template>
	<div class="text_skeleton"></div>
</template>

<style scoped>
.text_skeleton {
	width: 100%;
	height: 1rem;
	background-color: var(--c_card-bg);

	animation: skeleton_animation;
	animation-duration: 1s;
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