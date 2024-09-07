from sqlmodel import Field, Relationship, SQLModel

from .professionals import Professional
from .professionals_specializations_link import ProfessionalSpecialization


# Shared properties
class SpecializationBase(SQLModel):
    name: str | None = Field(default=None, unique=True)


class Specialization(SpecializationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professionals: list[Professional] = Relationship(
        back_populates="specializations", link_model=ProfessionalSpecialization
    )
