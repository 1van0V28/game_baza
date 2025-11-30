from json_loader import JsonImporter
from pathlib import Path
from backend.database.connection import session
from deduplicator import Deduplicator

GAMES_JSONL_PATH = Path(__file__).resolve().parents[1] / "etl" / "games.jsonl"

STEAM_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steam_games.jsonl" # Отсюда берется вся основная информация для games
GABESTORE_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "gabestore.jsonl"
STEAMBUY_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steambuy_games.jsonl"

store_jsonl_paths = {
    "Steam": STEAMBUY_JSONL_PATH,
    "GabeStore": GABESTORE_JSONL_PATH,
    "SteamBuy": STEAMBUY_JSONL_PATH
}

json_importer = JsonImporter(session)

deduplicator = Deduplicator(store_jsonl_paths)
deduplicator.start_dedupe()