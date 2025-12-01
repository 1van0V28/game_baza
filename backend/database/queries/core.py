from pathlib import Path

from backend.database.connection import engine
from backend.database.models import Base
from sqlalchemy.schema import CreateTable

SCHEMA_PATH = Path(__file__).resolve().parents[1] / "schemas" / "schema.sql"

def create_tables():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with open(SCHEMA_PATH, "w", encoding="utf-8") as f:
        for table in Base.metadata.sorted_tables:
            f.write(str(CreateTable(table).compile(engine)))
            f.write(";\n\n")
