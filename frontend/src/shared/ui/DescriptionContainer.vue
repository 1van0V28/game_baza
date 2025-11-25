<script setup lang="ts">
import { ref } from 'vue'
import TextSkeleton from './TextSkeleton.vue'

const props = defineProps<{ description: string | undefined }>()

const isActive = ref(false)

const handleReadAllClick = () => { isActive.value = !isActive.value }
</script>

<template>
	<div class="description">
		<template v-if="props.description">
			<div class="text" :class="{ text_active: isActive }">{{ props.description }}</div>
			<button class="button_read_all" @click="handleReadAllClick">{{ isActive ? "скрыть" : "читать полностью"}}</button>
		</template>

		<template v-else>
			<div class="skeleton_container">
				<TextSkeleton class="text_skeleton"/>
				<TextSkeleton class="text_skeleton text_skeleton--2"/>
				<TextSkeleton class="text_skeleton text_skeleton--3"/>
				<TextSkeleton class="text_skeleton text_skeleton--4"/>
				<TextSkeleton class="text_skeleton text_skeleton--5"/>
			</div>
		</template>
	</div>
</template>

<style scoped>
.description {
	--ad_text_skeleton: 1.5s;
	--fs_text: 1rem;
	--lh_text: 1.6;

	margin: 0.5rem 0 0 0;
	padding: 1.25rem 1.5rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 4px solid var(--c_card-bg);
	color: var(--c_text--muted);
	font-size: var(--fs_text);
	line-height: var(--lh_text);
}

.text {
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.text_active {
	display: flex;
}


.button_read_all {
	outline: none;
	border: none;
	padding: 0;
	width: fit-content;
	background-color: transparent;
	color: var(--c_secondary2);
	font-size: calc(var(--fs_text) - 0.1rem);
	font-family: "Press Start 2P", sans-serif;
	cursor: pointer;
	user-select: none;
}

.skeleton_container {
	display: flex;
	flex-direction: column;
	gap: calc(var(--fs_text) * var(--lh_text) - var(--fs_text));
}

.text_skeleton {
	height: var(--fs_text);
	animation-duration: var(--ad_text_skeleton);
}
.text_skeleton--2 {
	animation-delay: calc(var(--ad_text_skeleton) / 5);
}
.text_skeleton--3 {
	animation-delay: calc(var(--ad_text_skeleton) / 4);
}
.text_skeleton--4 {
	animation-delay: calc(var(--ad_text_skeleton) / 3);
}
.text_skeleton--5 {
	animation-delay: calc(var(--ad_text_skeleton) / 2);
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