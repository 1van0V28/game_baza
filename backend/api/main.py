from fastapi import FastAPI, Depends, HTTPException, Query
from typing import Optional, List
from sqlalchemy.orm import Session

from schemas import (
    GamesPage,
    GamePreview,
    GameFull,
    OfferDTO,
)
from backend.database.repositories.repositories import GameRepository
from backend.database.connection import get_db
from backend.api.filters import GameFilters

app = FastAPI()

def compute_min_prices(offers: List[OfferDTO]):

    if not offers:
        return 0, 0, 0

    min_price_original = min(o.price_original for o in offers if o.price_original is not None)
    min_price_discount = min(o.price_discount for o in offers if o.price_discount is not None)

    discount_percent = int(
        100 * (min_price_original - min_price_discount) / min_price_original
        if min_price_original else 0
    )

    return min_price_original, min_price_discount, discount_percent


@app.get("/games", response_model=GamesPage)
def get_games(
    last_id: int = 0,
    per_page: int = 50,
    title: Optional[str] = None,
    tags: Optional[List[str]] = Query(None),
    platforms: Optional[List[str]] = Query(None),
    genres: Optional[List[str]] = Query(None),
    price_min: Optional[int] = None,
    price_max: Optional[int] = None,
    sort: Optional[str] = None,
    db: Session = Depends(get_db),
):
    filters = GameFilters(
        title=title,
        tags=tags,
        platforms=platforms,
        genres=genres,
        price_min=price_min,
        price_max=price_max,
        sort=sort,
    )

    repo = GameRepository(db)

    total = repo.count()
    games = repo.get_filtered(
        last_id=last_id,
        per_page=per_page,
        filters=filters
    )

    items = []

    for game in games:
        offer_dtos = [
            OfferDTO(
                price_original=o.price_original,
                price_discount=o.price_discount,
                store=o.store.name,
                store_game_link=o.store_game_link
            )
            for o in game.offers
        ]

        min_price_original, min_price_discount, discount_percent = compute_min_prices(offer_dtos)

        items.append(
            GamePreview(
                id=game.id,
                title=game.title,
                image_url=game.image_url,
                min_price_original=min_price_original,
                min_price_discount=min_price_discount,
                discount_percent=discount_percent,
            )
        )

    next_last_id = items[-1].id if items else None

    return GamesPage(
        total=total,
        last_id=next_last_id,
        per_page=per_page,
        items=items,
    )


@app.get("/games/{game_id}", response_model=GameFull)
def get_game(game_id: int, session: Session = Depends(get_db)):
    repo = GameRepository(session)
    game = repo.get_game(game_id)

    if not game:
        raise HTTPException(404, "Game not found")

    offers = [
        OfferDTO(
            price_original=o.price_original,
            price_discount=o.price_discount,
            store=o.store.name,
            store_game_link=o.store_game_link
        )
        for o in game.offers
    ]

    min_price_original, min_price_discount, discount_percent = compute_min_prices(offers)

    return GameFull(
        id=game.id,
        min_price_original=min_price_original,
        min_price_discount=min_price_discount,
        discount_percent=discount_percent,
        release_date=game.release_date.isoformat() if game.release_date else None,
        developer=game.developer.name if game.developer else None,
        publisher=game.publisher.name if game.publisher else None,
        genres=[g.name for g in game.genres],
        offers=offers,
        description=game.description,
        image_url=game.image_url,
        title=game.title,
    )


@app.get("/games/search", response_model=GamesPage)
def search_games(query: str, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    games = repo.search_by_title(query)

    items = []

    for game in games:
        offer_dtos = [
            OfferDTO(
                price_original=o.price_original,
                price_discount=o.price_discount,
                store=o.store.name,
                store_game_link=o.store_game_link
            )
            for o in game.offers
        ]

        min_price_original, min_price_discount, discount_percent = compute_min_prices(offer_dtos)

        items.append(
            GamePreview(
                id=game.id,
                title=game.title,
                image_url=game.image_url,
                min_price_original=min_price_original,
                min_price_discount=min_price_discount,
                discount_percent=discount_percent,
            )
        )

    return GamesPage(
        total=len(items),
        last_id=None,
        per_page=len(items),
        items=items,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "backend.api.main:app",
        log_level="debug",
        reload=True,
    )
