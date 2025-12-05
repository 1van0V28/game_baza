from sqlalchemy.orm import Session, selectinload

from backend.api.filters import GameFilters
from backend.database.models import Game, Genre, Platform
from sqlalchemy import select, ScalarResult
from backend.database.connection import SessionLocal
from sqlalchemy import func


class GameRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_batch(self, last_id: int = 0, per_page: int = 50):
        stmt = select(Game).order_by(Game.id.asc()).limit(per_page).where(Game.id > last_id)
        result = self.session.execute(stmt).scalars().all()
        return result

    def get_filtered(
            self,
            last_id: int = 0,
            per_page: int = 50,
            filters: GameFilters | None = None,
    ):
        if filters is None:
            filters = GameFilters()

        query = self.session.query(Game)

        if filters.title:
            query = query.filter(Game.title.ilike(f"%{filters.title}%"))

        if last_id > 0:
            query = query.filter(Game.id > last_id)

        return query.limit(per_page).all()

    def get_game(self, id: int):
        stmt = (
            select(Game)
            .options(selectinload(Game.offers))
            .where(Game.id == id)
        )
        return self.session.execute(stmt).scalar_one_or_none()

    def get_by_title(self, title: str):
        stmt = select(Game).where(func.lower(Game.title) == title.lower())
        result = self.session.execute(stmt).scalars().all()
        return result

    def count(self):
        from sqlalchemy import func
        return self.session.execute(select(func.count(Game.id))).scalar()


class PlatformRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_platforms(self):
        stmt = select(Platform)
        result = self.session.execute(stmt).scalars().all()
        return result


class GenreRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_genres(self):
        stmt = select(Genre)
        result = self.session.execute(stmt).scalars().all()
        return result