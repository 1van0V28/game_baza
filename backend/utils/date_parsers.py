from datetime import date

MONTHS = {
    "янв": 1, "фев": 2, "мар": 3, "апр": 4, "мая": 5, "июн": 6,
    "июл": 7, "авг": 8, "сен": 9, "окт": 10, "ноя": 11, "дек": 12
}

# "21 авг. 2012 г."
def parse_russian_date(ru_date: str) -> date|None:

    if not ru_date:
        return None

    ru_date = ru_date.replace('. ', ' ').replace('г.', '')
    day, month, year = ru_date.split()
    print(day, month, year)

    return date(int(year), MONTHS.get(month), int(day))

# print(parse_russian_date("21 авг. 2012 г."))