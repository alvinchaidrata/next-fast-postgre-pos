from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_pagination.links import Page

from app.crud import user as crud
from app.schemas.user import User, UserBase, UserUpdate
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=Page[User])
def get_users(search: str = "", db: Session = Depends(get_db)):
    users = crud.get_users(search, db)
    return users


@router.post("/", response_model=User)
def create_user(
    user: UserBase,
    db: Session = Depends(get_db),
):
    db_user = crud.get_user_by_id(db, user_id=user.id)
    if db_user:
        raise HTTPException(status_code=400, detail="ID has been taken.")
    return crud.create_user(db=db, user=user)


@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/{user_id}", response_model=User)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(db=db, db_user=db_user, user=user)


@router.delete("/{user_id}", response_model=User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user_by_id(db=db, user_id=user_id)
