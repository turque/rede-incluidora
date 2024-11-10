from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

from .professionals_specializations_link import ProfessionalSpecialization

if TYPE_CHECKING:
    from .professionals import Professional


# Shared properties
class SpecializationBase(SQLModel):
    name: str | None = Field(default=None, unique=True)


class Specialization(SpecializationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professionals: list["Professional"] = Relationship(
        back_populates="specializations", link_model=ProfessionalSpecialization
    )
