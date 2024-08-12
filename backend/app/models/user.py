from sqlalchemy import Column, String, TIMESTAMP, text

from ..db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
