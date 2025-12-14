<script setup lang="ts">
import "../styles/main.css"
import "../styles/fonts.css"
</script>

<template>
	<RouterView />
</template>

<style>
:root {
  --h_header: 6.5rem;

  --w_games_gallary__load_button: auto;
  --w_game_info__button_scroll: fit-content;
  --w_game_info__description: 75%;

  --fs_load_indicator: 2rem;
  --fs_filter_button: 1.25rem;
  --fs_selector: 1rem;
  --fs_main_info: 1.5rem; 
  --fs_genre_bar: var(--fs_subtitle);
  --fs_game_offer_card: 1.1em;
  --fs_game_offers_title: 2rem;
  --fs_subtitle: 1.25rem;
  --fs_floated_button: 2.5rem;

  --p_header: 0 2rem;
  --p_games_catalog: 4rem;
  --p_selector: 0.5rem 1rem;
  --p_game_page_container: 4rem 8rem;
  --p_genre_bar: 0.5rem;
  --p_game_offers: 1rem 1.5rem;

  --gc_games__button_clear: 4;
  --gc_game_offers__button_clear: 5;
  --gc_button_apply: 5;

  --gtc_header: 2fr 3fr 2fr;
  --gtc_games_gallary: repeat(3, 1fr);
  --gtc_game_info: repeat(2, 1fr);
  --gtc_game_offer_card: repeat(3, 1fr);
  --gtc_games_filters_block: repeat(5, 1fr);

  --gtr_game_offer_card: 5rem;

  --gap_games_gallary: 2rem;
  --gap_game_info: 2rem;
  --gap_game_offers: 1rem;

  --ar_games_card__image: 1.6 / 1;

  --c_bg: #0B0D17;
  --c_card-bg: #1A1D2E;
  --c_card-bg--accent: #2C3046;
  --c_text: #F5F5F5;
  --c_text--muted: #C7C7C7;
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
		--fs_main_info: 1.25rem;
		--fs_game_offer_card: 0.9rem;
		--fs_subtitle: 1rem;
		--fs_floated_button: 2rem;

		--w_game_info__description: 100%;
		
		--p_header: 0 1.5rem;
		--p_games_catalog: 3.5rem;
		--p_selector: 0.5rem 0.5rem;
		--p_game_page_container: 3.5rem 7rem;
		--p_game_offers: 0.75rem 1.25rem;

		--gc_games__button_clear: 2;
		--gc_game_offers__button_clear: 3;
  		--gc_button_apply: 3;

		--gtc_header: 1fr 5fr 1fr;
		--gtc_games_gallary: repeat(2, 1fr);
		--gtc_game_info: 1fr;
		--gtc_game_offer_card: repeat(2, 1fr);
		--gtc_games_filters_block: repeat(3, 1fr);

		--gtr_game_offer_card: 4rem;

		--gap_game_offers: 0.75rem;

		--ar_games_card__image: 1.5 / 1;
	}
}
@media (max-width: 600px) {
	:root {
		--h_header: 5.5rem;

		--w_games_gallary__load_button: 100%;
		--w_game_info__button_scroll: 100%;

		--fs_load_indicator: 1.5rem;
		--fs_filter_button: 0.8rem;
		--fs_selector: 0.8rem; 
		--fs_main_info: 1rem; 
		--fs_game_offer_card: 0.7em;
		--fs_game_offers_title: 1.5rem;
		--fs_subtitle: 0.8rem;
		--fs_floated_button: 1.5rem;

		--p_header: 0 1rem;
		--p_games_catalog: 1.5rem;
		--p_selector: 0.5rem 0.25rem;
		--p_game_page_container: 1.5rem;
		--p_game_offers: 0.5rem;

		--gc_games__button_clear: 1;
		--gc_game_offers__button_clear: 2;
  		--gc_button_apply: 2;

		--gtc_header: 1fr 6fr;
		--gtc_games_gallary: 1fr;
		--gtc_games_filters_block: repeat(2, 1fr);

		--gtr_game_offer_card: 3rem;

		--gap_games_gallary: 1.5rem;
		--gap_game_offers: 0.5rem;
		--gap_game_info: 1rem;
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
