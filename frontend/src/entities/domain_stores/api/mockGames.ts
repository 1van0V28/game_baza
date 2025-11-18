import type { GameBase, GamesCatalogData } from "../model/Game"


const mockGames: GameBase[] = [
	{
		id: "5693a916-b56f-4a9e-bf37-9f9661e0eb32",
		imgURL: "https://static.gabestore.ru/product/370x460_hdb6w328p5g6-MfBA2VWVCsuyB0FTFco.jpg",
		title: "Mad Max",
		minPrice: 199
	},
	{
		id: "507f0303-cd79-48b7-88e0-f16a0a59d62e",
		imgURL: "https://static.gabestore.ru/product/370x460_0Q6C2ZECyPVivaFmWNOryAks0jZ-ZSNj.jpg",
		title: "Detroit: Become Human",
		minPrice: 329
	},
	{
		id: "90a6eb29-4ed4-45a1-b743-33397ecd3d48",
		imgURL: "https://static.gabestore.ru/product/370x460_D6vV6U2QSBQzXCubQSBdBaoNt5Q_BV2a.jpg",
		title: "Metro Exodus – Gold Edition",
		minPrice: 599 
	},
	{
		id: "baa89c69-d6ef-4957-ade6-4837eff8308e",
		imgURL: "https://static.gabestore.ru/product/370x460_VMq3zbET3lcxJtskCM3x5Vf0MI2woXdy.jpg",
		title: "Kingdom Come: Deliverance II Gold Edition",
		minPrice: 2699 
	},
	{
		id: "9e284f3e-5f0c-4696-a25e-8727524ae8c2",
		imgURL: "https://static.gabestore.ru/product/370x460_nS7_izg5bnvhfRtoInMrTXMlfrkfamy_.jpg",
		title: "Mount & Blade II: Bannerlord",
		minPrice: 1499 
	},
	{
		id: "d68d14fc-1e3c-4144-83a1-1486c79e90b2",
		imgURL: "https://static.gabestore.ru/product/370x460_1piYMZX7HAWtR6omazcJ1NHInGT52h7F.jpg",
		title: "Resident Evil Remake Trilogy",
		minPrice: 3699  
	},
	{
		id: "c0096818-63de-457f-ae53-89f8ef7deb6a",
		imgURL: "https://static.gabestore.ru/product/370x460_hP-du4ClJn3cnga631VVPgDMOC8p69_s.jpg",
		title: "Marvel's Guardians of the Galaxy",
		minPrice: 599   
	},
	{
		id: "5ed49f21-61ae-4e64-8f73-2d3c7c355176",
		imgURL: "https://static.gabestore.ru/product/370x460_SwWoo_Lp7KPAOsgHi7YvsMAFV0n1y1Jm.jpg",
		title: "Saints Row: The Third Remastered (Steam)",
		minPrice: 249    
	},
	{
		id: "55efe13a-4df1-4cfb-a3de-f42f303f625a",
		imgURL: "https://static.gabestore.ru/product/370x460_IUb_3rdL0wMyZMiuivGUdOwiBxwA_FEe.jpg",
		title: "Resident Evil Village - Gold Edition",
		minPrice: 1099     
	},
	{
		id: "b0b73e3e-3098-430a-8042-d2dd73291c43",
		imgURL: "https://static.gabestore.ru/product/370x460_sOnYo0OpV5cgKBaRpimQtedbE2MmLhSJ.jpg",
		title: "Beholder",
		minPrice: 69     
	},
	{
		id: "72d7e284-00f6-4aaa-989f-b5bced341555",
		imgURL: "https://static.gabestore.ru/product/370x460_cMHqoDJD2eSb7NNlx3GrKfzcEVBXoX8-.jpg",
		title: "Warhammer 40,000: Rogue Trader",
		minPrice: 599      
	},
	{
		id: "5613434d-ea04-42e4-9513-47848cbec768",
		imgURL: "https://static.gabestore.ru/product/370x460_P_mrHSHRlBu0BTNvY_Xrh9wHh60OrzzK.jpg",
		title: "Ghost of Tsushima DIRECTOR'S CUT (Версия для РФ)",
		minPrice: 3599       
	},
]

export const mockGamesData: GamesCatalogData = {
	gamesCount: 924,
	games: mockGames
}