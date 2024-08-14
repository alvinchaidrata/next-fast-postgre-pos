from pydantic import BaseModel
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

    class Config:
        from_attributes = True
