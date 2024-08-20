from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_pagination.links import Page

from app.crud import order as Order
from app.schemas.order import Order as OrderOut, OrderCreate
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=Page[OrderOut])
def get_order(search: str = "", db: Session = Depends(get_db)):
    orders = Order.get_orders(search, db)
    return orders


@router.post("/", response_model=OrderOut)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    return Order.create_order(db=db, order=order)


@router.get("/{order_id}", response_model=OrderOut)
def read_order(order_id: str, db: Session = Depends(get_db)):
    db_order = Order.get_order_by_id(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order


@router.delete("/{order_id}", response_model=OrderOut)
def delete_order(order_id: str, db: Session = Depends(get_db)):
    db_order = Order.get_order_by_id(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order.delete_order_by_id(db=db, order_id=order_id)
