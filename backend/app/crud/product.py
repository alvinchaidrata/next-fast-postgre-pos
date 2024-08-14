from fastapi import Response
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import Product as ProductSchema, ProductCreate, ProductUpdate
from fastapi_pagination.ext.sqlalchemy import paginate


def get_products(search: str, db: Session):
    return paginate(
        db,
        db.query(Product)
        .filter(Product.name.ilike("%" + search + "%"))
        .order_by(Product.created_at),
    )


def get_product_by_name(db: Session, product_name: str) -> ProductSchema:
    product = (
        db.query(Product)
        .filter(str(Product.name).lower() == product_name.lower())
        .first()
    )
    return product


def get_product_by_id(db: Session, product_id: int) -> ProductSchema:
    product = db.query(Product).filter(Product.id == product_id).first()
    return product


def create_product(
    db: Session,
    product: ProductCreate,
) -> ProductSchema:
    new_product = Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def update_product(
    db: Session,
    db_product: Product,
    product: ProductUpdate,
) -> ProductSchema:
    update_data = product.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            setattr(db_product, key, value)
    db.commit()
    return db_product


def delete_product_by_id(db: Session, product_id: int) -> ProductSchema:
    db.query(Product).filter(Product.id == product_id).delete(synchronize_session=False)
    db.commit()
    return Response(status_code=200)
