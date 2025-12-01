from database.queries.core import create_tables
from backend.etl.json_loader import JsonLoader
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from backend.config.config import config
from backend.seeds.run_seeds import run_all_seeds

engine = create_engine(
    url = config.db.DATABASE_URL_psycopg,
    echo = True
)

create_tables()
run_all_seeds()
SessionLocal = sessionmaker(bind = engine)

json_loader = JsonLoader(SessionLocal)
json_loader.load_data()