from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .users import User  # noqa: F401


# Shared properties
class PhoneBase(SQLModel):
    phone_number: str | None = Field(default=None)
    phone_type: str | None = Field(default=None)
    has_whatsapp: bool = Field(default=False)
    has_telegram: bool = Field(default=False)
    is_primary: bool = Field(default=False)
    usage_type: str | None = Field(default=None)


# Database model, database table inferred from class name
class Phone(PhoneBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="phones")
