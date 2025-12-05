from backend.config.config import config
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.orm import sessionmaker

db_config = config.db

engine = create_engine(
    url=db_config.DATABASE_URL_psycopg,
    echo=True
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_session():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
