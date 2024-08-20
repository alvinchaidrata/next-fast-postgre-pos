from pydantic import BaseModel
from datetime import datetime
from .product import Product


class OrderProduct(BaseModel):
    quantity: int
    total: float
    data: Product


class OrderBase(BaseModel):
    subtotal: float
    tax: float
    total: float
    products: list[OrderProduct]


class OrderCreate(OrderBase):
    pass


class Order(OrderBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
