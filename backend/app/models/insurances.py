from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

from .professionals import Professional  # noqa: F401

if TYPE_CHECKING:
    from .professional_insurances import ProfessionalInsurance  # noqa: F401


class InsuranceBase(SQLModel):
    name: str | None = Field(default=None)


class Insurance(InsuranceBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professionals: list[Professional] = Relationship(
        back_populates="insurances", link_model="ProfessionalInsurance"
    )
