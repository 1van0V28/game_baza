import type { Offer } from "./Offer"


export interface GameBase {
	id: string,
	title: string,
	image_url: string,
	min_price_original: number,
    min_price_discount: number,
    discount_percent: number
}
export interface GameFull extends GameBase {
	description: string,
	release_date: string,
  	developer: string,
	publisher: string,
	genres: string[]
	offers: Offer[]
}
export type GameInfo = Partial<Omit<GameFull, "offers">>

export interface GamesCatalogData {
	total: number,
  	last_id: number,
  	per_page: number,
	has_more: boolean,
	items: GameBase[]
}