import type { GameBase } from "@/entities/domain_stores/model/Game"
import { ref } from "vue"


export const gamePreview = ref<GameBase | undefined>()