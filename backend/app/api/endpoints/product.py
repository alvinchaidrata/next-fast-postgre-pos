from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_pagination.links import Page

from app.crud import product as Product
from app.schemas.product import Product as ProductOut, ProductCreate, ProductUpdate
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=Page[ProductOut])
def get_products(search: str = "", db: Session = Depends(get_db)):
    products = Product.get_products(search, db)
    return products


@router.post("/", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    db_product = Product.get_product_by_name(db, product_name=product.name)
    if db_product:
        raise HTTPException(status_code=400, detail="Product already exists")
    return Product.create_product(db=db, product=product)


@router.get("/{product_id}", response_model=ProductOut)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = Product.get_product_by_id(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
):
    db_product = Product.get_product_by_id(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product.update_product(db=db, db_product=db_product, product=product)


@router.delete("/{product_id}", response_model=ProductOut)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = Product.get_product_by_id(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product.delete_product_by_id(db=db, product_id=product_id)
