from sqlalchemy.orm import Session, selectinload

from backend.api.schemas import GameFilters
from backend.database.models import Game, Genre, Platform, Store, Offer
from sqlalchemy import select
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

        stmt = select(Game)

        if filters.title:
            stmt = stmt.filter(Game.title.ilike(f"%{filters.title}%"))

        if filters.genres:
            for genre_name in filters.genres:
                stmt = stmt.filter(Game.genres.any(Genre.name == genre_name))

        if filters.stores:
            stmt = stmt.filter(Game.offers.any(Offer.store.has(Store.name.in_(filters.stores))))

        if filters.platforms:
            for platform_name in filters.platforms:
                stmt = stmt.filter(Game.platforms.any(Platform.name == platform_name))

        if filters.price_min:
            stmt = stmt.filter(Game.offers.any(Offer.price_discount >= filters.price_min))

        if filters.price_max:
            stmt = stmt.filter(Game.offers.any(Offer.price_discount <= filters.price_max))

        if last_id > 0:
            stmt = stmt.filter(Game.id > last_id)

        total = self.count(stmt)
        stmt = stmt.order_by(Game.id).limit(per_page)

        result = self.session.execute(stmt)

        return total, result.scalars().all()

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

    def count(self, stmt):
        count_stmt = select(func.count()).select_from(stmt.subquery())
        result = self.session.execute(count_stmt).scalar()
        return result


class PlatformRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_platforms(self):
        stmt = select(Platform)
        result = self.session.execute(stmt).scalars().all()
        return result

class StoreRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_stores(self):
        stmt = select(Store)
        result = self.session.execute(stmt).scalars().all()
        return result

class GenreRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_genres(self):
        stmt = select(Genre)
        result = self.session.execute(stmt).scalars().all()
        return result