from pydantic import BaseModel


class AuthSession(BaseModel):
    access_token: str
    refresh_token: str


class AuthToken(BaseModel):
    exp: int  # Expiry time
    sub: str  # Subject
