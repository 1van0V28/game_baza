from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import List

from sqlalchemy.orm import Session

from backend.database.repositories.game import GameRepository
from backend.database.connection import get_db

app = FastAPI()

class GamePreview(BaseModel):
    id: int
    title: str
    image_url: str
    min_price: float

class GameFull(GamePreview):
    description: str
    rating: float

@app.get("/games", response_model=List[GamePreview])
def get_games(page: int = 0, per_page: int = 50, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    total = repo.count()
    games = repo.get_page(page, per_page)

    return {
        "total": total,
        "page": page,
        "per_page": per_page,
        "items": [
            GamePreview(
                id=game.id,
                title=game.title,
                image_url=game.image_url,
                min_price=game.price
            )
            for game in games
        ]
    }

@app.get("/games/{game_id}", response_model=GameFull)
def get_game(game_id: int):
    ...
