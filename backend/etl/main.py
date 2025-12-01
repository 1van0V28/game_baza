from pathlib import Path
from backend.database.connection import SessionLocal
from backend.etl.json_loader.json_loader import JsonLoader
from backend.etl.deduplicator.deduplicator import Deduplicator


# Пути к файлам
BASE_DIR = Path(__file__).resolve().parent
PARSERS_DIR = BASE_DIR.parent / "parsers"

GAMES_JSONL_PATH = BASE_DIR / "deduplicator" / "games.jsonl"
STEAM_JSONL_PATH = PARSERS_DIR / "steam_games.jsonl"
GABESTORE_JSONL_PATH = PARSERS_DIR / "gabestore_games.jsonl"
STEAMBUY_JSONL_PATH = PARSERS_DIR / "steambuy_games.jsonl"

STORES_JSONL_PATHS = {
    'Steam': STEAM_JSONL_PATH,
    'GabeStore': GABESTORE_JSONL_PATH,
    'SteamBuy': STEAMBUY_JSONL_PATH,
}


def deduplicate_offers():
    """Удалить дубликаты офферов из файлов парсеров"""
    print("Дедупликация офферов...")
    deduplicator = Deduplicator(STORES_JSONL_PATHS)
    deduplicator.start_dedupe()
    print("Дедупликация завершена")


def import_games_to_database():
    """Загрузить игры и офферы в БД"""
    print("Импорт данных в БД...")
    json_loader = JsonLoader(SessionLocal)
    json_loader.load_data(GAMES_JSONL_PATH, STORES_JSONL_PATHS)
    print("Импорт завершён")


def run_full_etl():
    """Полный ETL пайплайн: дедупликация - импорт"""
    deduplicate_offers()
    import_games_to_database()


if __name__ == "__main__":
    run_full_etl()