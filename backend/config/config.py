from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class DatabaseConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="DB_",
        env_file=BASE_DIR / ".env.local",  # для локальной разработки
        env_file_encoding="utf-8",
        extra="ignore"  # игнорировать лишние переменные
    )

    HOST: str
    PORT: str
    USER: SecretStr
    PASS: SecretStr
    NAME: str

    @property
    def DATABASE_URL_psycopg(self):
        return f"postgresql+psycopg://{self.USER.get_secret_value()}:{self.PASS.get_secret_value()}@{self.HOST}:{self.PORT}/{self.NAME}"

class Config(BaseSettings):
    db: DatabaseConfig = Field(default_factory=DatabaseConfig)

    @classmethod
    def load(cls) -> "Config":
        return cls()

config = Config.load()