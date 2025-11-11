import type { GamesFiltersDefinitionMap } from "../interface/FilterUI"


export const gamesFiltersDefinition: GamesFiltersDefinitionMap = {
	sort: {
		key: "sort",
		values: [
			"popularity",
			"cheap",
			"expensive",
			"sale",
			"release_date",
			"addition_date",
			"alphabet",
			"rating"
		]
	},
	genre: {
		key: "genre"
	},
	activation: {
		key: "activation"
	}
}