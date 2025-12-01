from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import select
from backend.etl.json_loader.json_reader import JsonReader
from backend.database.models import Game, Developer, Genre, Publisher, Platform, Store, Offer, Base
from backend.utils.normalizers import normalize_date

class JsonImporter:
    """Импортирует данные игр из JSON в БД."""

    def __init__(self, session_factory: sessionmaker):
        self.session_factory = session_factory
        self._entity_cache = {
            "developers": {},
            "publishers": {},
            "genres": {},
            "platforms": {},
            "stores": {},
        }

    def import_games_jsonl(self, reader: JsonReader):
        with self.session_factory() as session:
            for record in reader.stream():
                self._process_game_record(session, record)
            session.commit()

    def import_offers_jsonl(self, reader: JsonReader):
        with self.session_factory() as session:
            for record in reader.stream():
                self._process_offer_record(session, record)
            session.commit()

    def _process_game_record(self, session: Session, game_record: dict):
        if self._get_game_id(session, game_record["title"]):
            return

        developer_id = self._get_or_create_entity(
            session, Developer, game_record.get("developer")
        )
        publisher_id = self._get_or_create_entity(
            session, Publisher, game_record.get("publisher")
        )

        genre_objs = self._get_or_create_genres(
            session, game_record.get("genres")
        )

        game = Game(
            title=game_record["title"],
            description=game_record.get("description"),
            release_date=normalize_date(game_record.get('released')),
            image_url=game_record.get("image_url"),
            developer_id=developer_id,
            publisher_id=publisher_id,
        )

        for g in genre_objs:
            game.genres.append(g)

        session.add(game)

    def _process_offer_record(self, session: Session, offer_record: dict) -> None:
        """
        Обрабатывает одну запись offer: проверяет на дубликаты и добавляет в БД.

        Args:
            session: SQLAlchemy сессия
            offer_record: dict с данными offer
        """
        game_id = self._get_game_id(session, offer_record['title'])
        if not game_id:
            return

        # store_slug → id
        store_slug = offer_record.get("store")
        store_id = self._get_or_create_entity(
            session, Store, store_slug
        )

        offer = Offer(
            game_id=game_id,
            store_id=store_id,
            price_original=offer_record.get("price_original"),
            discount_percent=offer_record.get("discount_percent"),
            price_discount=offer_record.get("price_discount"),
            store_game_link=offer_record.get('link'),
        )

        session.add(offer)

    def _get_game_id(self, session: Session, title: str) -> int|None:
        """Проверяет, существует ли игра с таким названием."""
        stmt = select(Game.id).where(Game.title == title)
        return session.scalar(stmt)

    def _get_or_create_entity(
            self,
            session: Session,
            entity_class: type[Base],
            entity_name: str | None,
    ) -> int | None:
        """
        Получает ID сущности или создаёт новую.

        Args:
            session: SQLAlchemy сессия
            entity_class: Класс модели (Developer, Publisher и т.д.)
            entity_name: Название сущности

        Returns:
            ID сущности или None
        """
        if not entity_name:
            return None

        # Кешируем результаты для оптимизации
        cache_key = entity_class.__tablename__
        if entity_name in self._entity_cache[cache_key]:
            return self._entity_cache[cache_key][entity_name]

        # Ищем в БД
        stmt = select(entity_class).where(entity_class.name == entity_name)
        existing_entity = session.scalar(stmt)

        if existing_entity:
            entity_id = existing_entity.id
        else:
            # Создаём новую
            new_entity = entity_class(name=entity_name)
            session.add(new_entity)
            session.flush()
            entity_id = new_entity.id

        # Кешируем
        self._entity_cache[cache_key][entity_name] = entity_id
        return entity_id

    def _get_or_create_genres(self, session: Session, genre_names: list[str]) -> list[Genre]:
        """
        Получает или создаёт все жанры из списка.

        Args:
            session: SQLAlchemy сессия
            genre_names: Список названий жанров

        Returns:
            Список объектов Genre
        """
        genres = []

        if genre_names is None:
            return []

        for genre_name in genre_names:
            stmt = select(Genre).where(Genre.name == genre_name)
            genre = session.scalar(stmt)

            if not genre:
                genre = Genre(name=genre_name)
                session.add(genre)
                session.flush()

            genres.append(genre)

        return genres
