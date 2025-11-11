import type { GamesAvailableFilter } from "../model/Filter"


export const gamesFilters: GamesAvailableFilter[] = [
	{
		name: "genre",
		values: [
			"races", 
			"indie", 
			"casual", 
			"online", 
			"subscription",
			"adventures",
			"role-playing",
			"simualtors",
			"sport",
			"strategies",
			"action"
		],
	},
	{
		name: "activation",
		values: [
			"Battle.net",
			"EA App",
			"Epic Games Store",
			"GOG.com",
			"itch.io",
			"Microsoft",
			"more.tv",
			"Nintendo eShop",
			"Okko",
			"Rockstar Games",
			"STALCRAFT",
			"Steam",
			"Ubisoft Connect",
			"CTC"
		]
	}
]