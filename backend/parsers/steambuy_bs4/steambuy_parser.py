import requests
import json
import time
from datetime import datetime
from bs4 import BeautifulSoup

BASE_URL = "https://steambuy.com/ajax/_get.php"
OUTPUT_FILE = "../steambuy_games.jsonl"


def save_game_record(game: dict):
    """Сохраняем по одной записи — файл существует сразу."""
    with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(game, ensure_ascii=False) + "\n")


def parse_games(html: str):
    """Парсит HTML фрагмент одной страницы Steambuy."""
    soup = BeautifulSoup(html, "html.parser")

    items = soup.select(".product-item")
    games = []

    for item in items:
        # Заголовок
        title_elem = item.select_one(".product-item__title a")
        if not title_elem:
            title_elem = item.select_one(".product-item__title")

        # ПРАВИЛЬНЫЙ ПАРСИНГ ЦЕНЫ
        price = None
        discount = None

        # Ищем блок с ценой
        price_block = item.select_one(".product-item__price")

        if price_block:
            # Ищем процент скидки
            discount_elem = price_block.select_one(".product-item__discount")
            if discount_elem:
                discount = discount_elem.get_text(strip=True)

            # Ищем стоимость - она в product-item__cost
            cost_elem = price_block.select_one(".product-item__cost")
            if cost_elem:
                # Получаем весь текст (число + валюта)
                price = cost_elem.get_text(strip=True)

        # Дата выхода
        date_elem = None
        units = item.select(".product-item__unit")
        for unit in units:
            label = unit.select_one(".product-item__unit-label")
            if label and "ДАТА ВЫХОДА" in label.get_text():
                date_elem = unit.select_one(".product-item__unit-value")
                break

        # Рейтинг
        rating_elem = item.select_one(".product-item__unit-value_positive")
        if not rating_elem:
            rating_elem = item.select_one(".product-item__unit-value_negative")

        # Ссылка на игру
        link_elem = item.select_one("a[href*='/steam/']")

        game_data = {
            "title": title_elem.get_text(strip=True) if title_elem else None,
            "price": price,
            "discount": discount,
            "release_date": date_elem.get_text(strip=True) if date_elem else None,
            "rating": rating_elem.get_text(strip=True) if rating_elem else None,
            "url": f"https://steambuy.com{link_elem['href']}" if link_elem and link_elem.get('href') else None,
        }

        games.append(game_data)

    return games


def fetch_page(session, page_number):
    """Делает AJAX-запрос на страницу Steambuy."""

    records_per_page = 40
    offset_value = (page_number - 1) * records_per_page

    params = {
        "rnd": str(time.time()),
        "offset": offset_value,
        "promotion": 0,
        "special_offers": 0,
        "sort": "cnt_sell",
        "sortMode": "descendant",
        "view": "extended",
        "a": "getcat",
        "q": "",
        "series": "",
        "publisher": "",
        "izdatel": "",
        "currency": "wmr",
        "curr": "",
        "currMaxSumm[wmr]": 3000,
        "currMaxSumm[wmz]": 100,
        "currMaxSumm[wme]": 70,
        "currMaxSumm[wmu]": 1000,
        "letter": "",
        "limit": 0,
        "page": page_number,
        "minPrice": 0,
        "maxPrice": 99999,
        "minDate": 0,
        "maxDate": 0,
        "deleted": 0,
        "no_price_range": 0,
        "records": records_per_page,
    }

    resp = session.get(BASE_URL, params=params, timeout=10)
    resp.raise_for_status()

    try:
        data = resp.json()
        if "html" in data:
            return data["html"]
        elif "content" in data:
            return data["content"]
        else:
            return ""
    except json.JSONDecodeError:
        return resp.text


def fetch_all_games(max_pages=50):
    session = requests.Session()

    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://steambuy.com/"
    })

    print("Сбор начинается…")

    for page in range(1, max_pages + 1):
        print(f"\n=== Страница {page} ===")
        try:
            html = fetch_page(session, page)
        except Exception as e:
            print(f"Ошибка запроса стр. {page}: {e}")
            continue

        if not html:
            print("Пустой ответ — пропускаем.")
            continue

        games = parse_games(html)

        if not games:
            print("Игры не найдены — стоп.")
            break

        # Показываем первую игру для проверки
        if games:
            print(f"Пример игры: {games[0]}")

        for g in games:
            g["page"] = page
            g["scraped_at"] = datetime.now().isoformat()
            save_game_record(g)

        print(f"Собрано игр: {len(games)}")
        time.sleep(1)

    print("\nГотово.")


if __name__ == "__main__":
    fetch_all_games(max_pages=100)