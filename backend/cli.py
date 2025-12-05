import click
from backend.database.init_db import create_tables
from backend.etl.main import deduplicate_offers, import_games_to_database


def init_database_func():
    create_tables()
    print("База данных инициализирована")

def run_etl_func(skip_parsers=False):
    if not skip_parsers:
        pass  # run_parsers()
    deduplicate_offers()
    import_games_to_database()
    print("ETL завершён")

def prepare_data_func():
    deduplicate_offers()
    print("Данные подготовлены")

@click.group()
def cli():
    pass

@cli.command()
def init_db():
    init_database_func()

@cli.command()
@click.option("--skip-parsers", is_flag=True)
def run_etl(skip_parsers):
    run_etl_func(skip_parsers)

@cli.command()
@click.option("--skip-parsers", is_flag=True)
def full_pipeline(skip_parsers):
    init_database_func()
    run_etl_func(skip_parsers)
    prepare_data_func()

if __name__ == "__main__":
    cli()
