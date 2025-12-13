from backend.database.connection import engine
from backend.database.models import Base
from backend.seeds.seeds import seed_stores
from backend.database.connection import get_session_manager

def create_tables():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    from backend.seeds.seeds import seed_stores

    with get_session_manager() as session:
        seed_stores(session)
