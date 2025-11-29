<script setup lang="ts" generic="T extends string[]">
import type { UIMonoSelectorProps } from '../interface/FilterUI'
import LoadIndicator from '@/shared/ui/LoadIndicator.vue'

const props = defineProps<UIMonoSelectorProps<T>>()
</script>


<template>
	<div class="selector_filter">
		<div class="selector_label" @click="props.handleLabelClick">
			<span>
				{{ props.modelValue ?? props.label }}
			</span>
			<span class="selector_label__arrow" :class="{ arrow_active: props.isActive }">
				↓
			</span>
		</div>

		<div class="selector_separator">
			<div class="values_container" :class="{ container_active: props.isActive }">
				<template v-if="props.values">
					<div 
						class="selector_value"
						:class="{ value_active: props.modelValue == value}"
						v-for="value in props.values" 
						:key="value"
						@click="() => { props.handleValueClick(value) }">
						{{ value }}
					</div>
				</template>

				<div v-else class="load_container">
					<LoadIndicator :is-short="true"/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.selector_filter {
	display: flex;
	flex-direction: column;
	width: 100%;
	user-select: none;
}

.selector_label {
	padding: var(--p_selector);
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-size: var(--fs_selector);
	background-color: var(--c_text);
	cursor: pointer;
}

.selector_label__count {
	color: var(--c_highlight-accent)
}

.selector_label__arrow {
	transition: transform 0.2s ease-out;
}
.arrow_active {
	transform: rotateX(-180deg)
}

.selector_separator {
	position: relative;
	border-bottom: 4px solid var(--c_secondary2);
}

.values_container {
	z-index: 1;
	overflow-x: hidden;
	overflow-y: auto;
	position: absolute;
	display: none;
	width: 100%;
	height: 15rem;
	border: 4px solid var(--c_secondary2);
	background-color: var(--c_bg);
	scrollbar-width: thin;
  	scrollbar-color: var(--c_text) var(--c_bg);
}
.container_active {
	display: block
}

.selector_value {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: var(--p_selector);
	width: 100%;
	font-size: calc(var(--fs_selector) - 0.2rem);
	color: var(--c_text);
	cursor: pointer;
}
.selector_value:hover {
	background-color: var(--c_card-bg);
}
.value_active {
	color: var(--c_secondary2-accent);
}

.load_container {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
}
</style>