from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

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
def get_games():
    ...

@app.get("/games/{game_id}", response_model=GameFull)
def get_game(game_id: int):
    ...
