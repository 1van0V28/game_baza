from api.database.connection import engine, Base


def run_migration():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    print("Таблицы успешно созданы!")
    print(f"Создано таблиц: {len(Base.metadata.tables)}")

    for table_name in Base.metadata.tables.keys():
        print(f"  ✓ {table_name}")


if __name__ == "__main__":
    run_migration()