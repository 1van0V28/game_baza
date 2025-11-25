from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List

from sqlalchemy.orm import Session

from backend.database.repositories.game import GameRepository
from backend.database.connection import get_db

app = FastAPI()

from pydantic import BaseModel
from typing import List, Optional


class GamePreview(BaseModel):
    id: Optional[int]
    title: str
    image_url: str
    min_price: float


class GamesPage(BaseModel):
    total: int
    page: int
    per_page: int
    items: List[GamePreview]


class GameFull(GamePreview):
    price_original: str
    price_discount: str
    released: str
    reviews_count: int
    positive_percent: int
    rating: float
    link: str
    developer: str
    publisher: str
    genres: List[str]
    description: str


@app.get("/games", response_model=GamesPage)
def get_games(page: int = 0, per_page: int = 50, db: Session = Depends(get_db)):
    repo = GameRepository(db)

    total = repo.count()
    games = repo.get_page(page, per_page)

    return GamesPage(
        total=total,
        page=page,
        per_page=per_page,
        items=[
            GamePreview(
                id=game.id,
                title=game.title,
                image_url=game.image_url,
                min_price=5
            )
            for game in games
        ]
    )


@app.get("/games/{game_id}", response_model=GameFull)
def get_game(game_id: int, session: Session = Depends(get_db)):
    repo = GameRepository(session)
    game = repo.get_game(game_id)

    if not game:
        raise HTTPException(404, "Game not found")

    return GameFull(
        id=game.id,
        title=game.title,
        image_url=game.image_url,
        min_price=5,
        price_original=game.price_original,
        price_discount=game.price_discount,
        released=game.released,
        reviews_count=game.reviews_count,
        positive_percent=game.positive_percent,
        rating=game.rating,
        link=game.link,
        developer=game.developer,
        publisher=game.publisher,
        genres=game.genres,
        description=game.description
    )
