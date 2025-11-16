from backend.config import config
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.orm import sessionmaker

db_config = config.db

engine = create_engine(
    url=db_config.DATABASE_URL_psycopg,
    echo=True
)

session = sessionmaker(bind=engine)

# with session() as session:
#     session.