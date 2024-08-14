from sqlalchemy import Column, String, Float, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import ARRAY, JSON

from ..db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, nullable=False)
    subtotal = Column(Float, nullable=False)
    tax = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
    products = Column(ARRAY(JSON), nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
