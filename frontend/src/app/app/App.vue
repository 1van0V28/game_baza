<script setup lang="ts">
import HomePage from '@/pages/home_page/ui/HomePage.vue'
import "../styles/main.css"
import "../styles/fonts.css"
</script>

<template>
	<HomePage />
</template>

<style>
:root {
  --h_header: 6.5rem;

  --w_games_gallary__load_button: auto;

  --fs_load_indicator: 2rem;
  --fs_filter_button: 1.25rem;
  --fs_selector: 1rem;

  --p_header: 0 2rem;
  --p_games_catalog: 4rem;
  --p_selector: 0.5rem 1rem;

  --gc_button_clear: 4;
  --gc_button_apply: 5;

  --gtc_header: 2fr 3fr 2fr;
  --gtc_games_gallary: repeat(5, 1fr);

  --gap_games_gallary: 2rem;

  --c_bg: #0B0D17;
  --c_card-bg: #1A1D2E;
  --c_text: #F5F5F5;
  --c_placeholder: #7F7F7F;
  --c_accent: #009944;
  --c_accent2: #990044; 
  --c_highlight: #FFD700;
  --c_highlight-accent: #FFCC33;
  --c_secondary: #006688;
  --c_secondary2: #660099;
  --c_secondary2-accent: #9933CC;

  	overflow-x: hidden;
  	scrollbar-width: thin;
  	scrollbar-color: var(--c_highlight-accent) var(--c_bg);
}
@media (max-width: 1024px) {
	:root {
		--h_header: 6rem;

		--fs_filter_button: 1rem;
		
		--p_header: 0 1.5rem;
		--p_games_catalog: 3.5rem;
		--p_selector: 0.5rem 0.5rem;

		--gc_button_clear: 2;
  		--gc_button_apply: 3;

		--gtc_header: 1fr 5fr 1fr;
		--gtc_games_gallary: repeat(3, 1fr);
	}
}
@media (max-width: 600px) {
	:root {
		--h_header: 5.5rem;

		--w_games_gallary__load_button: 100%;

		--fs_load_indicator: 1.5rem;
		--fs_selector: 0.8rem;

		--p_header: 0 1rem;
		--p_games_catalog: 1.5rem;
		--p_selector: 0.5rem 0.25rem;

		--gc_button_clear: 1;
  		--gc_button_apply: 2;

		--gtc_header: 1fr 6fr;
		--gtc_games_gallary: repeat(2, 1fr);

		--gap_games_gallary: 1.5rem;
	}
}

#app {
	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--c_bg);
	font-family: "Press Start 2P", sans-serif;
	color: var(--c_bg);
}
</style>
