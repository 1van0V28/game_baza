from sqlalchemy.orm import sessionmaker
from backend.etl.json_loader.json_reader import JsonReader
from backend.etl.json_loader.json_importer import JsonImporter

class JsonLoader:
    def __init__(self, session_maker: sessionmaker):
        self.session_maker = session_maker

    def load_data(self, games_path, offers_paths: dict):
        self._load_games(games_path)
        self._load_offers(offers_paths)

    def _load_games(self, jsonl_path):
        reader = JsonReader(jsonl_path)
        importer = JsonImporter(self.session_maker)
        importer.import_games_jsonl(reader)

    def _load_offers(self, jsonl_paths: dict):
        for store_slug, jsonl_path in jsonl_paths.items():
            reader = JsonReader(jsonl_path, store_slug=store_slug)
            importer = JsonImporter(self.session_maker)
            importer.import_offers_jsonl(reader)

