import re
from datetime import date

def normalize_title(title: str) -> str:
    title = title.lower().strip()

    title = re.sub(r"[™®©]", "", title)
    title = re.sub(
        r'(\s*-\s*)?(game of the year|deluxe|goty|complete edition|ultimate edition|dlc|bundle|pack).*',
        '',
        title
    )

    title = re.sub(r'[^a-z0-9а-я\s]', '', title)
    title = re.sub(r'\s+', ' ', title)

    return title

GENRE_MAP = {
    # GabeStore
    "экшен": "Экшены",
    "приключения": "Приключения",
    "ролевые": "РПГ",
    "симуляторы": "Симуляторы",
    "стратегии": "Стратегии",
    "спортивные": "Спорт",
    "гонки": "Гонки",
    "казуальные": "Казуальные",
    "казуальные игры": "Казуальные",


    # SteamBuy
    "шутер": "Экшены",
    "файтинги": "Файтинги",
    "приключение": "Приключения",
    "симулятор": "Симуляторы",
    "ролевая игра": "РПГ",
    "спортивная игра": "Спорт",
    "казуальная игра": "Казуальные",
    "аниме": "Аниме",

    # Пропуски
    "онлайн": None,
    "подписка": None,
    "карта оплаты": None,
    "mmo": None,
    "классика": None,
    "жанры": None,
    "бесплатные": None,
    "приключенческие игры": "Приключения",
    "ранний доступ": None
}

def normalize_genres(genres):
    result = []

    for genre in genres:
        g_norm = genre.strip().lower()

        mapped = GENRE_MAP.get(g_norm)

        if mapped is None:
            continue

        result.append(mapped)

    if not result:
        result = ["Казуальные"]

    return sorted(set(result))

MONTHS = {
    "янв": 1, "фев": 2, "мар": 3, "апр": 4, "мая": 5, "июн": 6,
    "июл": 7, "авг": 8, "сен": 9, "окт": 10, "ноя": 11, "дек": 12
}

# "21 авг. 2012 г."
def normalize_date(ru_date: str) -> date|None:

    if not ru_date:
        return None

    ru_date = ru_date.replace('. ', ' ').replace('г.', '')
    day, month, year = ru_date.split()
    print(day, month, year)

    return date(int(year), MONTHS.get(month), int(day))

# print(parse_russian_date("21 авг. 2012 г."))