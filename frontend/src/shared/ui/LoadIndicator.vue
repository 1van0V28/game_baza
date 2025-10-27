<template>
	<p class="loading_indicator">
		Loading<span class="dot_1">.</span>
			   <span class="dot_2">.</span>
			   <span class="dot_3">.</span>
	</p>
</template>

<style scoped>
.loading_indicator {
	--ad_loading: 1.2s;

	font-size: var(--fs_load_indicator);
	color: var(--c_secondary2);

	animation-name: loading_indicator_animation;
	animation-duration: var(--ad_loading);
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
}
@keyframes loading_indicator_animation {
	50% {
		color: var(--c_secondary2-accent);
	}
}

.dot_1, .dot_2, .dot_3 {
	display: inline-block;
	animation-name: dot_animation;
	animation-duration: var(--ad_loading);
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
}
.dot_2 {
	animation-delay: calc(var(--ad_loading) / 3);
}
.dot_3 {
	animation-delay: calc(var(--ad_loading) / 3 * 2);
}
@keyframes dot_animation {
	0%, 50%, 100% {
		transform: translateY(0);
	}
	25% {
		transform: translateY(-100%);
	}
}
</style>