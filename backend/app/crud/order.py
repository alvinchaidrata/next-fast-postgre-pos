from fastapi import Response, HTTPException
from sqlalchemy.orm import Session
from fastapi_pagination.ext.sqlalchemy import paginate
from app.models.order import Order
from app.schemas.order import Order as OrderSchema, OrderCreate
from app.crud import product as Product
from app.utils.string import generate_random_uppercase_string


def get_orders(search: str, db: Session):
    return paginate(
        db,
        db.query(Order)
        .filter(Order.id.ilike("%" + search + "%"))
        .order_by(Order.created_at),
    )


def get_order_by_id(db: Session, order_id: int) -> OrderSchema:
    order = db.query(Order).filter(Order.id == order_id).first()
    return order


def create_order(
    db: Session,
    order: OrderCreate,
) -> OrderSchema:
    new_order = Order(**order.model_dump())

    # Generate order id
    while True:
        new_order.id = generate_random_uppercase_string(12)
        if not get_order_by_id(db, new_order.id):
            break
    db.add(new_order)

    # Deduce stock from products bought
    for order_product in order.products:
        db_product = Product.get_product_by_id(db, order_product.data.id)
        if not db_product:
            raise HTTPException(status_code=500, detail="Error during stock deduction")
        setattr(db_product, "stock", getattr(db_product, "stock") - 1)

    db.commit()
    db.refresh(new_order)
    return new_order


def delete_order_by_id(db: Session, order_id: int) -> OrderSchema:
    db.query(Order).filter(Order.id == order_id).delete(synchronize_session=False)
    db.commit()
    return Response(status_code=200)
