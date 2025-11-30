from pathlib import Path

from sqlalchemy.orm import sessionmaker

from backend.etl.json_reader import JsonReader
from backend.etl.json_importer import JsonImporter, DataType

class JsonLoader:
    def __init__(self, session_maker: sessionmaker):
        self.session_maker = session_maker

    def load_data(self, games_path, offers_paths):
        self._load_games(games_path)
        self._load_offers(offers_paths)

    def _load_games(self, jsonl_path):
        reader = JsonReader(jsonl_path)
        importer = JsonImporter(self.session_maker)
        importer.import_from_reader(reader, DataType.GAMES)

    def _load_offers(self, jsonl_paths):
        for jsonl_path in jsonl_paths:
            reader = JsonReader(jsonl_path)
            importer = JsonImporter(self.session_maker)
            importer.import_from_reader(reader, DataType.OFFERS)
