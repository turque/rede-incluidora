from datetime import date
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .professionals import Professional  # noqa: F401


# Shared properties
class SpecializationBase(SQLModel):
    specialization: str | None = Field(default=None)
    description: str | None = Field(default=None)
    certification: str | None = Field(default=None)
    institution: str | None = Field(default=None)
    year_obtained: date | None = Field(default=None)


# Database model, database table inferred from class name
class Specialization(SpecializationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professional_id: int | None = Field(
        default=None, foreign_key="professional.id", nullable=False
    )
    professional: "Professional" = Relationship(back_populates="specializations")


# Properties to receive via API on creation
class SpecializationCreate(SpecializationBase):
    pass


# Properties to receive via API on update, all are optional
class SpecializationUpdate(SpecializationBase):
    pass


# Properties to return via API, id is always required
class SpecializationPublic(SpecializationBase):
    id: int


class SpecializationsPublic(SQLModel):
    data: list[SpecializationPublic]
    count: int
