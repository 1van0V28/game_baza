import requests
import time
import json
import os
from bs4 import BeautifulSoup

OUTPUT_FILE = "../gabestore_games.jsonl"
DELAY_SECS = 0.35
MAX_PAGES = 300


def parse_gabestore_card(card):
    name_el = card.select_one(".shop-item__name")
    title = name_el.text.strip() if name_el else ""

    href = name_el.get("href") if name_el else ""
    link = "https://gabestore.ru" + href if href else ""

    img_el = card.select_one(".shop-item__image img")
    image_url = img_el.get("src") if img_el else ""

    price_current_el = card.select_one(".shop-item__price-current")
    price_discount_el = card.select_one(".shop-item__price-discount")

    price_discount = price_current_el.text.strip() if price_current_el else "Бесплатно"

    discount_percent = None
    if price_discount_el:
        try:
            discount_percent = int(price_discount_el.text.replace("%", "").replace("-", "").strip())
        except:
            pass

    price_original = price_discount

    return {
        "title": title,
        "price_original": price_original,
        "price_discount": price_discount,
        "discount_percent": discount_percent,
        "image_url": image_url,
        "released": None,
        "reviews_count": None,
        "positive_percent": None,
        "link": link,
        "developer": None,
        "publisher": None,
        "genres": [],
        "description": "",
    }


def fetch_and_stream(filename=OUTPUT_FILE):
    total_processed = 0
    page = 1

    session = requests.Session()
    session.headers.update({
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0 Safari/537.36"
    })

    with open(filename, "a", encoding="utf-8") as out_f:
        try:
            while page <= MAX_PAGES:

                url = f"https://gabestore.ru/catalog?page={page}"

                resp = session.get(url, timeout=15)
                if resp.status_code != 200:
                    print(f"HTTP {resp.status_code} на странице {page}")
                    break

                soup = BeautifulSoup(resp.text, "lxml")
                cards = soup.select(".shop-item")

                if not cards:
                    print("Каталог закончился.")
                    break

                written = 0
                for card in cards:
                    obj = parse_gabestore_card(card)

                    out_f.write(json.dumps(obj, ensure_ascii=False) + "\n")
                    out_f.flush()

                    try:
                        os.fsync(out_f.fileno())
                    except:
                        pass

                    written += 1
                    total_processed += 1

                print(f"Страница {page}: записано {written}; всего: {total_processed}")

                page += 1
                time.sleep(DELAY_SECS)

        except KeyboardInterrupt:
            print("\nОстановка пользователем. Всё сохранено.")
        except Exception as e:
            print(f"\nОшибка: {e}. Всё сохранено.")
        finally:
            print(f"Итог: {total_processed} игр.")

fetch_and_stream()