import type { GamesAvailableFilter, GameOffersAvailableFilter } from "../model/Filter"


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

export const gameOffersFilters: GameOffersAvailableFilter[] = [
	{
		name: "store",
		values: [
			"Steam",
			"Epic Games Store",
			"GOG.com",
			"VK Play"
		]
	},
	{
		name: "platform",
		values: [
			"PC",
			"PS4",
			"PS5",
			"Nintento Switch",
			"XBOX ONE",
			"XBOX Series"
		]
	}
]