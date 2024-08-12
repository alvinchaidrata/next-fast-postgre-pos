from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    image: str
    name: str
    description: str
    price: float
    stock: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    image: Optional[str] = None

    class Config:
        from_attributes = True


class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
