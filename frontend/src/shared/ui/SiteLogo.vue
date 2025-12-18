<template>
	<a class="logo" href="/"><span class="underlining"></span></a>
</template>

<style scoped>
.logo {
	font-size: 2rem;
	text-decoration: none;
	font-family: "Sixtyfour";
	color: var(--c_secondary2-accent);
}
.logo::before {
	content: "GAMEBAZA"
}

.underlining::before {
	content: ">_";
	animation-name: underlining_animation;
	animation-duration: 1s;
	animation-iteration-count: infinite;
}
@keyframes underlining_animation {
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@media (max-width: 1024px) {
	.logo::before {
		content: "GB"
	}
}
@media (max-width: 600px) {
	.underlining::before {
		content: ""
	}
}
</style>