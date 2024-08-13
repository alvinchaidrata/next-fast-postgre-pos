from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    PROJECT_DESCRIPTION: str = os.getenv("PROJECT_DESCRIPTION")
    PROJECT_VERSION: str = os.getenv("PROJECT_VERSION")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    CORS_ORIGIN_URL: str = os.getenv("CORS_ORIGIN_URL")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_REFRESH_SECRET_KEY: str = os.getenv("JWT_REFRESH_SECRET_KEY")

    class Config:
        case_sensitive = True


settings = Settings()
