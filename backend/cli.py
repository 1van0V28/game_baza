import click
import sys
from backend.database.init_db import create_tables
from backend.etl.main import deduplicate_offers, import_games_to_database


@click.group()
@click.pass_context
def cli(ctx):
    """Game Database Management CLI"""
    ctx.ensure_object(dict)


@cli.command()
def init_db():
    """Initialize database tables."""
    try:
        create_tables()
        click.echo(click.style("✓ База данных инициализирована", fg="green"))
    except Exception as e:
        click.echo(click.style(f"✗ Ошибка: {e}", fg="red"))
        sys.exit(1)


@cli.command()
@click.option("--skip-parsers", is_flag=True, help="Пропустить парсинг данных")
def run_etl(skip_parsers):
    """Run ETL pipeline."""
    try:
        if not skip_parsers:
            click.echo("Запуск парсеров...")
            # run_parsers()

        click.echo("Дедупликация офферов...")
        deduplicate_offers()

        click.echo("Импорт игр в БД...")
        import_games_to_database()

        click.echo(click.style("✓ ETL завершён успешно", fg="green"))
    except Exception as e:
        click.echo(click.style(f"✗ Ошибка ETL: {e}", fg="red"))
        sys.exit(1)


@cli.command()
def prepare_data():
    """Prepare and deduplicate data."""
    try:
        click.echo("Подготовка данных...")
        deduplicate_offers()
        click.echo(click.style("✓ Данные подготовлены", fg="green"))
    except Exception as e:
        click.echo(click.style(f"✗ Ошибка: {e}", fg="red"))
        sys.exit(1)


@cli.command()
@click.option("--skip-parsers", is_flag=True, help="Пропустить парсинг данных")
@click.confirmation_option(prompt="Это пересоздаст БД. Продолжить?")
def full_pipeline(skip_parsers):
    """Run complete pipeline: init DB → ETL → prepare data."""
    try:
        click.echo(click.style("\n=== Полный пайплайн ===", fg="cyan", bold=True))

        click.echo("\n1. Инициализация БД...")
        create_tables()

        click.echo("\n2. Запуск ETL...")
        if not skip_parsers:
            # run_parsers()
            pass
        deduplicate_offers()
        import_games_to_database()

        click.echo("\n3. Подготовка данных...")
        deduplicate_offers()

        click.echo(click.style("\n✓ Пайплайн завершён успешно!", fg="green", bold=True))
    except Exception as e:
        click.echo(click.style(f"\n✗ Ошибка пайплайна: {e}", fg="red"))
        sys.exit(1)


# @cli.command()
# def status():
#     """Check database and ETL status."""
#     click.echo("Проверка статуса...")
#     click.echo("Статус: OK")


if __name__ == "__main__":
    cli()