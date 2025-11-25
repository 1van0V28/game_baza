from sqlalchemy.orm import Session
from backend.database.models import Game
from sqlalchemy import select, ScalarResult
from backend.database.connection import SessionLocal
from backend.database.models import Offer


class GameRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_page(self, page: int = 0, per_page: int = 50):
        stmt = select(Game).limit(per_page).offset(page * per_page)
        result = self.session.execute(stmt).scalars().all()
        return result

    def get_game(self, game_id: int):
        # stmt = (
        #     select(Offer)
        #     .join(Game, Game.offer_id == Offer.id)
        #     .where(Game.id == game_id)
        # )
        stmt = select(Game).where(Game.id==game_id)
        result = self.session.execute(stmt).scalar()
        return result

    def count(self):
        from sqlalchemy import func
        return self.session.execute(select(func.count(Game.id))).scalar()


# session = SessionLocal()
# game_repository = GameRepository(session)
# print(game_repository.get_game(1))