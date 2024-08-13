from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    id: str
    name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    id: str
    name: str
    email: EmailStr
    password: str

    class Config:
        from_attributes = True


class User(UserBase):
    class Config:
        from_attributes = True


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr

    class Config:
        from_attributes = True
