from sqlmodel import Field, Relationship, SQLModel

from .professionals import Professional
from .professionals_insurances_link import ProfessionalInsurance


class InsuranceBase(SQLModel):
    name: str | None = Field(default=None, unique=True)


class Insurance(InsuranceBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    professionals: list[Professional] | None = Relationship(
        back_populates="insurances", link_model=ProfessionalInsurance
    )
