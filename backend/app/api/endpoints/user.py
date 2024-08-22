from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_pagination.links import Page
from app.crud import user as User
from app.schemas.user import UserBase, UserUpdate, UserOut
from app.db.session import get_db
from app.dependencies.auth import verify_admin

router = APIRouter()


@router.get("/", response_model=Page[UserOut])
def get_users(
    search: str = "",
    db: Session = Depends(get_db),
    auth_user: UserBase = Depends(verify_admin),
):
    users = User.get_users(search, db)
    return users


@router.post("/", response_model=UserOut)
def create_user(
    user: UserBase,
    db: Session = Depends(get_db),
    auth_user: UserBase = Depends(verify_admin),
):
    exist = User.get_user_by_id(db, user_id=user.id)
    if exist:
        raise HTTPException(status_code=400, detail="ID has been taken.")
    return User.create_user(db=db, user=user)


@router.get("/{user_id}", response_model=UserOut)
def read_user(
    user_id: str,
    db: Session = Depends(get_db),
    auth_user: UserBase = Depends(verify_admin),
):
    db_user = User.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/{user_id}", response_model=UserOut)
def update_user(
    user_id: str,
    user: UserUpdate,
    db: Session = Depends(get_db),
    auth_user: UserBase = Depends(verify_admin),
):
    db_user = User.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return User.update_user(db=db, db_user=db_user, user=user)


@router.delete("/{user_id}", response_model=UserOut)
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    auth_user: UserBase = Depends(verify_admin),
):
    db_user = User.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User.delete_user_by_id(db=db, user_id=user_id)
