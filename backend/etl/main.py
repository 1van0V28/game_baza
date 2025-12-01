from backend.database.connection import SessionLocal
from pathlib import Path
from json_loader.json_loader import JsonLoader
from deduplicator.deduplicator import Deduplicator

GAMES_JSONL_PATH = Path(__file__).resolve().parent / 'deduplicator' / "games.jsonl"

STEAM_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steam_games.jsonl" # Отсюда берется вся основная информация для games
GABESTORE_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "gabestore_games.jsonl"
STEAMBUY_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steambuy_games.jsonl"

stores_jsonl_paths = {
    'Steam': STEAMBUY_JSONL_PATH,
    'GabeStore': GABESTORE_JSONL_PATH,
    'SteamBuy': STEAMBUY_JSONL_PATH,
}

def import_games_to_database():
    deduplicate_offers()
    json_loader = JsonLoader(SessionLocal)
    json_loader.load_data(GAMES_JSONL_PATH, stores_jsonl_paths)

def deduplicate_offers():
    deduplicator = Deduplicator(stores_jsonl_paths)
    deduplicator.start_dedupe()

deduplicate_offers()
import_games_to_database()