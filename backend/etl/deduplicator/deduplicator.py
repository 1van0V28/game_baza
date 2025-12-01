import json
from backend.etl.json_loader.json_reader import JsonReader
from pathlib import Path
from backend.utils.normalizers import normalize_title, normalize_genres

GAMES_JSONL_PATH = Path(__file__).resolve() / 'games.jsonl'


class Deduplicator:
    GAME_FIELDS = [
        'title', 'image_url', 'released',
        'developer', 'publisher', 'genres', 'description'
    ]

    def __init__(self, stores_jsonl_paths: dict):
        self.stores_jsonl_paths = stores_jsonl_paths
        self.games = {}

        self.store_ranks = {
            "Steam": 1,
            "GabeStore": 2,
            "SteamBuy": 2
        }

    def start_dedupe(self):
        """Главный процесс: пройтись по всем магазинам и собрать игры."""
        for store_type, path in self.stores_jsonl_paths.items():
            self._consume_store(path, store_type)

        self._write_jsonl(self.games)

    def _consume_store(self, path, store_type):
        """Читает JSONL конкретного магазина и обрабатывает каждое предложение."""
        reader = JsonReader(path)

        for offer in reader.stream():
            self._add_or_update_game(offer, store_type)

    def _add_or_update_game(self, offer: dict, store_type: str):
        norm_title = normalize_title(offer["title"])
        existing = self.games.get(norm_title)

        if existing is None:
            # создаём новую игру
            game = {field: offer.get(field) for field in self.GAME_FIELDS}
            game["source"] = store_type  # откуда впервые нашли

            game = self._preprocess_game(game)
            self.games[norm_title] = game
            return

        # иначе обновляем недостающие поля
        self._merge_game(existing, offer, store_type)

    def _merge_game(self, game: dict, offer: dict, store_type: str):

        # # пример приоритета
        # override = self.store_ranks.get(store_type, 99) < \
        #            self.store_ranks.get(game.get("source"), 99)

        for field in self.GAME_FIELDS:
            val = offer.get(field)

            # если нет значения - не трогаем
            if val is None:
                continue

            # если поле пустое у текущей игры - ставим
            if game.get(field) is None:
                game[field] = val
                continue

            # # если приоритет магазина выше - перезаписываем
            # if override:
            #     game[field] = val

    def _preprocess_game(self, game: dict):
        if game.get("genres"):
            game["genres"] = normalize_genres(game["genres"])
        return game

    def _write_jsonl(self, games: dict):
        with open('games.jsonl', 'w', encoding='utf-8') as f:
            for g in games.values():
                f.write(json.dumps(g, ensure_ascii=False) + "\n")
