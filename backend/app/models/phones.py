from sqlmodel import Field, Relationship, SQLModel

from .users import User


# Shared properties
class PhoneBase(SQLModel):
    phone_number: str | None = Field(default=None, max_length=30)
    phone_type: str | None = Field(default=None, max_length=100)
    has_whatsapp: bool = False
    has_telegram: bool = False
    is_primary: bool = False
    usage_type: str | None = Field(default=None, max_length=100)


# Properties to receive via API on creation
class PhoneCreate(PhoneBase):
    pass


# Properties to receive via API on update, all are optional
class PhoneUpdate(PhoneBase):
    pass


# Database model, database table inferred from class name
class Phone(PhoneBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: "User" = Relationship(back_populates="user_phone")


# Properties to return via API, id is always required
class PhonePublic(PhoneBase):
    id: int


class PhonesPublic(SQLModel):
    data: list[PhonePublic]
    count: int
