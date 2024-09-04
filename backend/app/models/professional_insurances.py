from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .insurances import Insurance  # noqa: F401
    from .professionals import Professional  # noqa: F401


class ProfessionalInsurance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    id_professional: int | None = Field(default=None, foreign_key="professional.id")
    id_insurance: int | None = Field(default=None, foreign_key="insurance.id")
    professional: "Professional" = Relationship(back_populates="insurances")
