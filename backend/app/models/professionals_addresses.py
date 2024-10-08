from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .professionals import Professional  # noqa: F401


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
    professional_id: int = Field(foreign_key="professional.id")
    professional: "Professional" = Relationship(back_populates="addresses")
