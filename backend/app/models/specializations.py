from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.professionals import Professional


# Shared properties
class SpecializationBase(SQLModel):
    name: str | None = Field(default=None)


class Specialization(SpecializationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professionals: list["Professional"] = Relationship(
        back_populates="specializations", link_model="ProfessionalSpecialization"
    )
