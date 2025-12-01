from backend.database.connection import SessionLocal  # ← только SessionLocal нужен
from backend.database.init_db import create_tables
from backend.etl.main import run_full_etl


def init_database():
    """Создать таблицы БД"""
    create_tables()
    print("База данных инициализирована")


def main():
    """Запуск ETL пайплайна"""
    run_full_etl()
    print("ETL завершён")


if __name__ == "__main__":
   # init_database()  # только при первом запуске или после изменений схемы
    main()