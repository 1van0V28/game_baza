from contextlib import contextmanager

from backend.config.config import config
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.orm import sessionmaker

db_config = config.db

engine = create_engine(
    url=db_config.DATABASE_URL_psycopg
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

@contextmanager
def get_session_manager():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()

def get_session():
    with get_session_manager() as session:
        yield session