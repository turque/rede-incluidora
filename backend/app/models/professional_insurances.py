from sqlmodel import Field, Relationship, SQLModel

from .insurances import Insurance
from .professionals import ProfessionalData


class ProfessionalInsurance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    id_professional: int | None = Field(default=None, foreign_key="professionaldata.id")
    id_insurance: int | None = Field(default=None, foreign_key="insurance.id")
    professional: ProfessionalData | None = Relationship(back_populates="insurances")
    insurance: Insurance | None = Relationship(back_populates="professionals")
