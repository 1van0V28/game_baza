from backend.database.init_db import create_tables
from backend.etl.main import deduplicate_offers, import_games_to_database


def init_database():
    """Создать таблицы БД (запускать один раз)"""
    create_tables()
    print("База данных инициализирована")


def prepare_data():
    """Очистить дубликаты офферов"""
    deduplicate_offers()
    print("Данные подготовлены")


def run_etl():
    """Полный цикл ETL: парсинг - очистка - загрузка"""
    # run_parsers()
    deduplicate_offers()
    import_games_to_database()
    print("ETL завершён")


if __name__ == "__main__":
    # init_database()  # если нужно пересоздать таблицы
    run_etl()