from pydantic import BaseModel, field_validator
from typing import List, Optional
import re
from fastapi import Query

class GamePreview(BaseModel):
    id: int
    title: str
    image_url: str
    min_price_original: int
    min_price_discount: int
    discount_percent: int

    class Config:
        from_attributes = True

class GamesPage(BaseModel):
    total: int
    last_id: Optional[int]
    per_page: int
    has_more: bool = False
    items: List[GamePreview]

class OfferDTO(BaseModel):
    store: str
    price_original: int
    price_discount: int
    store_game_link: str

    @field_validator("price_original", "price_discount", mode="before")
    def parse_price(cls, v):
        if isinstance(v, int):
            return v

        if v is None:
            return None

        if isinstance(v, str):
            s = v.strip().lower()

            if s == "бесплатно":
                return 0

            digits = re.sub(r"[^\d]", "", s)
            if digits.isdigit():
                return int(digits)

        raise ValueError(f"Cannot parse price: {v}")

    class Config:
        from_attributes = True

class GameFull(GamePreview):
    description: str|None
    release_date: str
    developer: str
    publisher: str
    genres: List[str]
    # positive_percent: int
    offers: List[OfferDTO]

    class Config:
        from_attributes = True


class GameFilters(BaseModel):
    title: Optional[str] = Query(None)
    platforms: Optional[List[str]] = Query(None)
    genres: Optional[List[str]] = Query(None)
    stores: Optional[List[str]] = Query(None)
    price_min: Optional[int] = Query(None)
    price_max: Optional[int] = Query(None)
    sort: Optional[str] = Query(None)
