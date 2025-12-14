from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from sqlalchemy.orm import Session

from backend.api.schemas import (
    GamesPage,
    GamePreview,
    GameFull,
    OfferDTO,
    GameFilters,
)
from backend.database.repositories.repositories import GameRepository, GenreRepository, StoreRepository
from backend.database.connection import get_session

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get(
    "/games",
    response_model=GamesPage,
    summary="Список игр",
    description="Возвращает постраничный список игр с минимальными ценами и базовой информацией. Поддерживаются фильтры.",
)
def get_games(
    last_id: int = Query(0, description="ID последней загруженной записи (для постраничной навигации)"),
    per_page: int = Query(50, description="Количество элементов на страницу"),
    title: Optional[str] = Query(None, description="Фильтр по названию (подстрока)"),
    platforms: Optional[List[str]] = Query(None, description="Фильтр по платформам (несколько значений)"),
    genres: Optional[List[str]] = Query(None, description="Фильтр по жанрам (несколько значений)"),
    stores: Optional[List[str]] = Query(None, description="Фильтр по магазинам (несколько значений)"),
    price_min: Optional[int] = Query(None, description="Минимальная цена"),
    price_max: Optional[int] = Query(None, description="Максимальная цена"),
    sort: Optional[str] = Query(None, description="Ключ сортировки (не работает)"),
    db: Session = Depends(get_session),
):
    filters = GameFilters(
        title=title,
        stores=stores,
        platforms=platforms,
        genres=genres,
        price_min=price_min,
        price_max=price_max,
        sort=sort,
    )

    repo = GameRepository(db)

    total = repo.count()
    raw_games = repo.get_filtered(
        last_id=last_id,
        per_page=per_page + 1,
        filters=filters
    )

    has_more = len(raw_games) > per_page

    games = raw_games[:per_page]

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
        has_more=has_more,
        items=items,
    )

@app.get(
    "/games/{game_id}",
    response_model=GameFull,
    summary="Информация об игре",
    description="Детальная информация по одной игре: описания, жанры, даты релиза и доступные офферы.",
    response_description="Полный объект игры с рассчитанными минимальными ценами и списком офферов."
)
def get_game(
    game_id: int,
    session: Session = Depends(get_session),
):
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

@app.get(
    "/genres",
    summary="Справочник жанров",
    description="Простой список всех жанров. Лёгкий справочный эндпоинт для фильтров на фронтенде."
)
def get_genres(db: Session = Depends(get_session)):
    repo = GenreRepository(db)
    genres = repo.get_genres()
    return genres

@app.get(
    "/stores",
    summary="Справочник магазинов",
    description="Список магазинов/площадок, где можно купить игры. Используется для фильтрации офферов."
)
def get_stores(db: Session = Depends(get_session)):
    repo = StoreRepository(db)
    stores = repo.get_stores()
    return stores

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "backend.api.main:app",
        log_level="debug",
        reload=True,
    )
