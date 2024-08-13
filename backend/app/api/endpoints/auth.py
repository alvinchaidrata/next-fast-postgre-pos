from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.crud import user as crud
from app.db.session import get_db
from app.schemas.auth import AccessToken
from app.utils.password import verify_password
from app.utils.auth import create_access_token, create_refresh_token

router = APIRouter()


@router.post("/login", response_model=AccessToken)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    db_user = crud.get_user_by_id(db, user_id=form_data.username)
    if db_user is None:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    if not verify_password(form_data.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    return {
        "access_token": create_access_token(db_user),
        "refresh_token": create_refresh_token(db_user),
    }
