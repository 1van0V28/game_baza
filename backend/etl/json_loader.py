from pathlib import Path

from backend.etl.json_reader import JsonReader
from backend.etl.json_importer import JsonImporter, DataType

GAMES_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steam_scrapy" / "steam_games.jsonl"
OFFERS_JSONL_PATH = Path(__file__).resolve().parents[1] / "parsers" / "steam_scrapy" / "steam_games.jsonl"

class JsonLoader:
    def __init__(self, session_maker):
        self.session_maker = session_maker

    def load_data(self):
        self._load_games()
        self._load_offers()

    def _load_games(self):
        reader = JsonReader(GAMES_JSONL_PATH)
        importer = JsonImporter(self.session_maker)
        importer.import_from_reader(reader, DataType.GAMES)

    def _load_offers(self):
        reader = JsonReader(OFFERS_JSONL_PATH)
        importer = JsonImporter(self.session_maker)
        importer.import_from_reader(reader, DataType.OFFERS)
