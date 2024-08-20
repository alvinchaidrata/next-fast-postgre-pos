from fastapi import Response
from sqlalchemy.orm import Session
from fastapi_pagination.ext.sqlalchemy import paginate
from app.models.user import User
from app.schemas.user import User as UserSchema, UserBase, UserUpdate
from app.utils.password import get_hashed_password


def get_users(search: str, db: Session):
    return paginate(
        db,
        db.query(User)
        .filter(User.id.ilike("%" + search + "%"))
        .order_by(User.created_at),
    )


def get_user_by_id(db: Session, user_id: str) -> UserSchema:
    user = db.query(User).filter(User.id == user_id).first()
    return user


def create_user(
    db: Session,
    user: UserBase,
) -> UserSchema:
    new_user = User(**user.model_dump())
    new_user.password = get_hashed_password(new_user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update_user(
    db: Session,
    db_user: User,
    user: UserUpdate,
) -> UserSchema:
    update_data = user.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user_by_id(db: Session, user_id: str) -> UserSchema:
    db.query(User).filter(User.id == user_id).delete(synchronize_session=False)
    db.commit()
    return Response(status_code=200)
