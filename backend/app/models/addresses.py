from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .users import User  # noqa: F401


# Shared properties
class AddressBase(SQLModel):
    street: str | None
    number: str | None
    complement: str | None
    neighborhood: str | None
    city: str | None
    state: str | None
    postal_code: str | None


# Database model, database table inferred from class name
class Address(AddressBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    user: "User" = Relationship(back_populates="addresses")


# Properties to receive via API on creation
class AddressCreate(AddressBase):
    pass


# Properties to receive via API on update, all are optional
class AddressUpdate(AddressBase):
    pass


# Properties to return via API, id is always required
class AddressPublic(AddressBase):
    id: int


class AddresssPublic(SQLModel):
    data: list[AddressPublic]
    count: int
