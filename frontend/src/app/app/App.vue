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

  --p_header: 0 2rem;

  --gtc_header: 2fr 3fr 2fr;

  --c_bg: #0B0D17;
  --c_card-bg: #1A1D2E;
  --c_text: #E0E0E0;
  --c_placeholder: #7F7F7F;
  --c_accent: #009944;   /* тёмный зелёный неон */
  --c_accent2: #990044;  /* тёмная фуксия */
  --c_highlight: #FAEF5D;
  --c_secondary: #006688; /* тёмный синий */
  --c_secondary2: #660099;
  --c_secondary2-accent: #9933CC;
}
@media (max-width: 1024px) {
	:root {
		--h_header: 6rem;
		
		--p_header: 0 1.5rem;

		--gtc_header: 1fr 5fr 1fr;
	}
}
@media (max-width: 600px) {
	:root {
		--h_header: 5.5rem;

		--p_header: 0 1rem;

		--gtc_header: 1fr 6fr;
	}
}

#app {
	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--c_bg);
	font-family: "Press Start 2P", sans-serif;
}

</style>
