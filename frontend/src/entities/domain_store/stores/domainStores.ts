import { useDomainStore } from "../lib/useDomainStore"
import type { GameBase } from "../model/Game"


export const gamesStore = useDomainStore<GameBase[]>()