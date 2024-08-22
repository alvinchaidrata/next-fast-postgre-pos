from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt
import json
from pydantic import ValidationError
from typing import Union
from datetime import datetime

from app.db.session import get_db
from app.schemas.auth import AuthToken
from app.schemas.user import User
from app.crud import user as UserCrud
from ..utils.auth import ALGORITHM, JWT_SECRET_KEY

reuseable_oauth = OAuth2PasswordBearer(tokenUrl="/login", scheme_name="JWT")


async def verify_user(
    token: str = Depends(reuseable_oauth), db: Session = Depends(get_db)
) -> User:
    try:
        # Axios headers automatically include "\r\n" hence we remove it here
        payload = jwt.decode(
            token.replace("\r\n", ""), JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = AuthToken(**payload)
        token_user = json.loads(token_data.sub)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user: Union[User, None] = UserCrud.get_user_by_id(db, token_user["id"])

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )

    return user


async def verify_admin(user: User = Depends(verify_user)) -> User:
    if user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return User
