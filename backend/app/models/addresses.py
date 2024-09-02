from sqlmodel import Field, Relationship, SQLModel

from .users import User


# Shared properties
class AddressBase(SQLModel):
    street: str | None = Field(default=None, max_length=256)
    number: str | None = Field(default=None, max_length=10)
    complement: str | None = Field(default=None, max_length=256)
    neighborhood: str | None = Field(default=None, max_length=256)
    city: str | None = Field(default=None, max_length=256)
    state: str | None = Field(default=None, max_length=256)
    postal_code: str | None = Field(default=None, max_length=15)


# Properties to receive via API on creation
class AddressCreate(AddressBase):
    pass


# Properties to receive via API on update, all are optional
class AddressUpdate(AddressBase):
    pass


# Database model, database table inferred from class name
class Address(AddressBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: "User" = Relationship(back_populates="user_address")


# Properties to return via API, id is always required
class AddressPublic(AddressBase):
    id: int


class AddresssPublic(SQLModel):
    data: list[AddressPublic]
    count: int
