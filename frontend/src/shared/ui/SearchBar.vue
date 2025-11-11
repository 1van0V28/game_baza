<script setup lang="ts">
const searchInput = defineModel()
const props = defineProps<{ placeholder: string }>()
defineEmits(["search_click"])
</script>


<template>
	<div class="container">
		<input 
			class="search_bar" 
			type="search" 
			v-model="searchInput"
			:placeholder="props.placeholder"/>	
		<button class="search_button" @click="$emit('search_click')">найти</button>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	width: 100%;
	gap: 1rem;
}

.search_bar {
	box-sizing: border-box;
	padding: 0.5rem;
	width: 100%;
	outline: none;
	border: 4px solid var(--c_secondary2);
	font-size: 1rem;
	font-family: "Press Start 2P", sans-serif;
	background-color: var(--c_card-bg);
	color: var(--c_text);
	transition: border-color 0.2s ease-in-out;
}
.search_bar::placeholder {
	color: var(--c_placeholder);
}
.search_bar:focus {
	border-color: var(--c_secondary2-accent);
}

.search_button {
	border: none;
	background-color: var(--c_secondary2-accent);
	font-size: 1rem;
	font-family: "Press Start 2P", sans-serif;
	cursor: pointer;
	transition: color 0.1s ease-out, scale 0.1s ease-out;
}
.search_button:active {
	color: var(--c_text);
	scale: 0.9;
}
</style>