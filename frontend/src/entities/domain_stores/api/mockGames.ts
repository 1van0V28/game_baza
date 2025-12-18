import type { GameBase, GameFull, GamesCatalogData } from "../model/Game"


const mockGames: GameBase[] = [
  	{
    	id: "5693a916-b56f-4a9e-bf37-9f9661e0eb32",
    	image_url: "https://static.gabestore.ru/product/370x460_hdb6w328p5g6-MfBA2VWVCsuyB0FTFco.jpg",
    	title: "Mad Max",
		min_price_original: 199,
		min_price_discount: 159,
		discount_percent: 20
	},
	{
		id: "507f0303-cd79-48b7-88e0-f16a0a59d62e",
		image_url: "https://static.gabestore.ru/product/370x460_0Q6C2ZECyPVivaFmWNOryAks0jZ-ZSNj.jpg",
		title: "Detroit: Become Human",
		min_price_original: 329,
		min_price_discount: 263,
		discount_percent: 20
	},
	{
		id: "90a6eb29-4ed4-45a1-b743-33397ecd3d48",
		image_url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/abcd2bf3c275092d637d7dd98e0061dbdd2fd2da/header.jpg?t=1765218599",
		title: "Metro Exodus – Gold Edition",
		min_price_original: 599,
		min_price_discount: 479,
		discount_percent: 20
	},
	{
		id: "baa89c69-d6ef-4957-ade6-4837eff8308e",
		image_url: "https://static.gabestore.ru/product/370x460_VMq3zbET3lcxJtskCM3x5Vf0MI2woXdy.jpg",
		title: "Kingdom Come: Deliverance II Gold Edition",
		min_price_original: 2699,
		min_price_discount: 2159,
		discount_percent: 20
	},
	{
		id: "9e284f3e-5f0c-4696-a25e-8727524ae8c2",
		image_url: "https://static.gabestore.ru/product/370x460_nS7_izg5bnvhfRtoInMrTXMlfrkfamy_.jpg",
		title: "Mount & Blade II: Bannerlord",
		min_price_original: 1499,
		min_price_discount: 1199,
		discount_percent: 20
	},
	{
		id: "d68d14fc-1e3c-4144-83a1-1486c79e90b2",
		image_url: "https://static.gabestore.ru/product/370x460_1piYMZX7HAWtR6omazcJ1NHInGT52h7F.jpg",
		title: "Resident Evil Remake Trilogy",
		min_price_original: 3699,
		min_price_discount: 2959,
		discount_percent: 20
	},
	{
		id: "c0096818-63de-457f-ae53-89f8ef7deb6a",
		image_url: "https://static.gabestore.ru/product/370x460_hP-du4ClJn3cnga631VVPgDMOC8p69_s.jpg",
		title: "Marvel's Guardians of the Galaxy",
		min_price_original: 599,
		min_price_discount: 479,
		discount_percent: 20
	},
	{
		id: "5ed49f21-61ae-4e64-8f73-2d3c7c355176",
		image_url: "https://static.gabestore.ru/product/370x460_SwWoo_Lp7KPAOsgHi7YvsMAFV0n1y1Jm.jpg",
		title: "Saints Row: The Third Remastered (Steam)",
		min_price_original: 249,
		min_price_discount: 199,
		discount_percent: 20
	},
	{
		id: "55efe13a-4df1-4cfb-a3de-f42f303f625a",
		image_url: "https://static.gabestore.ru/product/370x460_IUb_3rdL0wMyZMiuivGUdOwiBxwA_FEe.jpg",
		title: "Resident Evil Village - Gold Edition",
		min_price_original: 1099,
		min_price_discount: 879,
		discount_percent: 20
	},
	{
		id: "b0b73e3e-3098-430a-8042-d2dd73291c43",
		image_url: "https://static.gabestore.ru/product/370x460_sOnYo0OpV5cgKBaRpimQtedbE2MmLhSJ.jpg",
		title: "Beholder",
		min_price_original: 69,
		min_price_discount: 55,
		discount_percent: 20
	},
	{
		id: "72d7e284-00f6-4aaa-989f-b5bced341555",
		image_url: "https://static.gabestore.ru/product/370x460_cMHqoDJD2eSb7NNlx3GrKfzcEVBXoX8-.jpg",
		title: "Warhammer 40,000: Rogue Trader",
		min_price_original: 599,
		min_price_discount: 479,
		discount_percent: 20
	},
	{
		id: "5613434d-ea04-42e4-9513-47848cbec768",
		image_url: "https://static.gabestore.ru/product/370x460_P_mrHSHRlBu0BTNvY_Xrh9wHh60OrzzK.jpg",
		title: "Ghost of Tsushima DIRECTOR'S CUT (Версия для РФ)",
		min_price_original: 3599,
		min_price_discount: 2879,
		discount_percent: 20
	}
]

export const mockGamesData: GamesCatalogData = {
	total: 924,
	last_id: 50,
	per_page: 50,
	has_more: false,
	items: mockGames
}



export const mockGameInfoData: GameFull = {
	id: "90a6eb29-4ed4-45a1-b743-33397ecd3d48",
	image_url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/abcd2bf3c275092d637d7dd98e0061dbdd2fd2da/header.jpg?t=1765218599",
	title: "Metro Exodus – Gold Edition",
	min_price_original: 599,
	min_price_discount: 479,
	discount_percent: 20,
	release_date: "2019-02-15",
	developer: "4A Games",
	publisher: "Deep Silver",
	genres: ["action", "adventures"],
	description: "Cерия «Метро» является предметом национальной гордости. Неудивительно, что игры моментально обрели популярность на просторах России. В этих играх было всё, что так близко русскому духу: чувство общности, потери, выживания. Постапокалиптическая подземка Москвы, открытые пространства, свойский менталитет персонажей. Игры «Метро» всегда были понятны российскому игроку. Но история требовала завершения. «Метро: Исход» продолжает сюжет второй части. За основу игры взята счастливая концовка. Главный герой вместе с выжившими рейнджерами ордена «Спарты» отправляется на поезде «Аврора» далеко на восток, чтобы найти новое место для жизни. С этого момента игра превращается в road-movie. Игроку предстоит путешествовать по обширным локациям, изучать их и сражаться с новыми видами монстров и людьми. Игра заметно прибавила в масштабе, например, в ней много красивых локаций на свежем воздухе. Геймплей игры претерпел изменения. В первую очередь, сказался масштаб карт. Из коридорного шутера игра превратилась в экшен с открытым миром. Игроку доступны различные виды оружия, которые можно модифицировать прямо на ходу, по карте разбросаны схроны. Никуда не делась survival-часть игры. У игрока за спиной рюкзак, в котором находятся все необходимые вещи, а запасы по‑прежнему необходимо пополнять. За графическую часть отвечает улучшенный движок 4A Engine. В игре появилась смена погодных условий, цикла дня и ночи, а также времён года. Визуальный стиль преобразился – открытые просторы раскрывают движок на полную. «Метро: Исход» — это долгожданное продолжение и завершение серии «Метро». Проверьте себя на прочность на просторах постапокалиптической России. И да хранят вас патроны.",
	offers: [
		{
			store: "GabeStore",
			price_original: 599,
			price_discount: 479,
			store_game_link: "https://gabestore.ru/metro-exodus-gold-edition"
		},
		{
			store: "GameShop",
			price_original: 649,
			price_discount: 519,
			store_game_link: "https://gameshop.ru/metro-exodus-gold-edition"
		},
		{
			store: "ConsoleMarket",
			price_original: 799,
			price_discount: 799,
			store_game_link: "https://consolemarket.ru/metro-exodus-gold-edition-ps5"
		}
	]
};