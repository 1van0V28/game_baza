import json

class JsonReader:
    def __init__(self, path):
        self.path = path

    def stream(self):
        with open(self.path, encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    yield json.loads(line)
