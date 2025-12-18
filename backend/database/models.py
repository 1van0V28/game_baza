from sqlalchemy import Table, Column, Integer, String, Text, ForeignKey, Date, MetaData
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from sqlalchemy.ext.declarative import as_declarative

@as_declarative()
class Base(object):
    id = Column(Integer, autoincrement=True, primary_key=True)
    metadata = MetaData()

# Связующие таблицы many-to-many
genres_games = Table(
    'genres_games',
    Base.metadata,
    Column('genre_id', Integer, ForeignKey('genres.id', ondelete='CASCADE'), primary_key=True),
    Column('game_id', Integer, ForeignKey('games.id', ondelete='CASCADE'), primary_key=True)
)

platforms_games = Table(
    'platforms_games',
    Base.metadata,
    Column('platform_id', Integer, ForeignKey('platforms.id', ondelete='CASCADE'), primary_key=True),
    Column('game_id', Integer, ForeignKey('games.id', ondelete='CASCADE'), primary_key=True)
)


class Developer(Base):
    __tablename__ = "developers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)

    # Связь с играми
    games: Mapped[list["Game"]] = relationship(back_populates="developer")

    def __repr__(self) -> str:
        return f"Developer(id={self.id}, name={self.name})"


class Publisher(Base):
    __tablename__ = "publishers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)

    # Связь с играми
    games: Mapped[list["Game"]] = relationship(back_populates="publisher")


class Platform(Base):
    __tablename__ = "platforms"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    # Связь many-to-many с играми
    games: Mapped[list["Game"]] = relationship(
        secondary=platforms_games,
        back_populates="platforms"
    )


class Genre(Base):
    __tablename__ = "genres"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    # Связь many-to-many с играми
    games: Mapped[list["Game"]] = relationship(
        secondary=genres_games,
        back_populates="genres"
    )


class Store(Base):
    __tablename__ = "stores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Связь с предложениями
    offers: Mapped[list["Offer"]] = relationship(back_populates="store")


class Game(Base):
    __tablename__ = "games"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    release_date: Mapped[date | None] = mapped_column(Date, nullable=True, index=True)
    image_url: Mapped[str | None] = mapped_column(String(1000), nullable=True)

    # Внешние ключи
    developer_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey('developers.id', ondelete='SET NULL'),
        nullable=True
    )
    publisher_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey('publishers.id', ondelete='SET NULL'),
        nullable=True
    )

    # Связи
    developer: Mapped["Developer"] = relationship(back_populates="games")
    publisher: Mapped["Publisher"] = relationship(back_populates="games")
    offers: Mapped[list["Offer"]] = relationship(back_populates="game", cascade="all, delete-orphan")

    # Many-to-many связи
    platforms: Mapped[list["Platform"]] = relationship(
        secondary=platforms_games,
        back_populates="games"
    )
    genres: Mapped[list["Genre"]] = relationship(
        secondary=genres_games,
        back_populates="games"
    )


class Offer(Base):
    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    # Внешние ключи
    game_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('games.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    store_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey('stores.id', ondelete='CASCADE'),
        nullable=True,
        index=True
    )
    # platform_id: Mapped[int | None] = mapped_column(
    #     Integer,
    #     ForeignKey('platforms.id', ondelete='SET NULL'),
    #     nullable=True
    # )

    # Данные о цене
    store_game_link: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    price_original: Mapped[int | None] = mapped_column(Integer, nullable=True)
    price_discount: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    discount_percent: Mapped[str | None] = mapped_column(String(4), nullable=True)

    # # Отзывы (специфично для Steam)
    # reviews_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    positive_percent: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Связи
    game: Mapped["Game"] = relationship(back_populates="offers")
    store: Mapped["Store"] = relationship(back_populates="offers")
    # platform: Mapped["Platform"] = relationship()


