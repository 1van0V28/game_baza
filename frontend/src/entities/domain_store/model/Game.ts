export interface GameBase {
	imgURL: string,
	title: string,
	minPrice: number,
}

export interface GameFull extends GameBase {
	genres: string[],
	description: string
}