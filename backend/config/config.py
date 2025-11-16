from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

# Общие настройки моделей
class ConfigBase(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_PATH,
        env_file_encoding="utf-8",
        )

# Модель для десериализации конфига для БД
class DatabaseConfig(ConfigBase):
    model_config = SettingsConfigDict(env_prefix="DB_")

    HOST: str
    PORT: str
    USER: SecretStr
    PASS: SecretStr
    NAME: str

    # property - декоратор, который делает из метода вычисляемое свойство

    # для асинхронного подключения (потом)
    # @property
    # def DATABASE_URL_asyncpg(self):
    #     return f"postgresql+asyncpg://{self.USER.get_secret_value()}:{self.PASS.get_secret_value()}@{self.HOST}:{self.PORT}/{self.NAME}"

    @property
    def DATABASE_URL_psycopg(self):
        # DSN
        return f"postgresql+psycopg2://{self.USER.get_secret_value()}:{self.PASS.get_secret_value()}@{self.HOST}:{self.PORT}/{self.NAME}"

# Класс со всеми моделями
class Config(ConfigBase):
    db: DatabaseConfig = Field(default_factory=DatabaseConfig)

    @classmethod
    def load(cls) -> "Config":
        return cls()

config = Config()