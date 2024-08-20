from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    id: str
    password: str
    image: Optional[str] = ""
    role: str


class UserUpdate(BaseModel):
    id: str
    password: Optional[str]
    image: Optional[str] = ""
    role: str

    class Config:
        from_attributes = True


class User(UserBase):
    class Config:
        from_attributes = True


class UserOut(BaseModel):
    id: str
    image: Optional[str] = ""
    role: str

    class Config:
        from_attributes = True
