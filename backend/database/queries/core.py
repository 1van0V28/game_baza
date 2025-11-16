from ..connection import engine
from ..models import Base
from sqlalchemy.schema import CreateTable


def create_tables():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with open("schemas/schema.sql", "w", encoding="utf-8") as f:
        for table in Base.metadata.sorted_tables:
            f.write(str(CreateTable(table).compile(engine)))
            f.write(";\n\n")
