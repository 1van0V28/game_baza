import json
import logging
from datetime import datetime
from pathlib import Path

from sqlalchemy import select, and_
from ..database.models import Base, Game, Developer, Publisher, Genre, Offer, Store, Platform

# Настройки
JSONL_PATH = Path(__file__).resolve().parents[3] / "parsers" / "steam_scrapy" / "steam_games.jsonl"
STORE_NAME = "Steam"
BATCH_SIZE = 50  # коммит каждые N записей

