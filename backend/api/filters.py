from pydantic import BaseModel
from typing import Optional, List
from fastapi import Query

class GameFilters(BaseModel):
    title: Optional[str] = Query(None)
    tags: Optional[List[str]] = Query(None)
    platforms: Optional[List[str]] = Query(None)
    genres: Optional[List[str]] = Query(None)
    price_min: Optional[int] = Query(None)
    price_max: Optional[int] = Query(None)
    sort: Optional[str] = Query(None)
