import uuid
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

from .professionals_insurances_link import ProfessionalInsurance

if TYPE_CHECKING:
    from .professionals import Professional


class InsuranceBase(SQLModel):
    name: str | None = Field(default=None, unique=True)


class Insurance(InsuranceBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    professionals: list["Professional"] | None = Relationship(
        back_populates="insurances", link_model=ProfessionalInsurance
    )
