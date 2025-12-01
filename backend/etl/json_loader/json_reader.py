import json
import os

class JsonReader:
    def __init__(self, path, store_slug=None):
        self.path = path
        self.store_slug = store_slug or self._guess_store_slug(path)

    def _guess_store_slug(self, path: str) -> str:
        base = os.path.basename(path).lower()

        if "steam" in base:
            return "steam"
        if "epic" in base:
            return "epic"
        if "gog" in base:
            return "gog"
        return "unknown"

    def stream(self):
        with open(self.path, encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    record = json.loads(line)
                    record["store"] = self.store_slug
                    yield record
