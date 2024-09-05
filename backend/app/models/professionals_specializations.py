from datetime import date

from sqlmodel import Field, SQLModel


# Shared properties
class ProfessionalSpecializationBase(SQLModel):
    description: str | None = Field(default=None)
    certification: str | None = Field(default=None)
    institution: str | None = Field(default=None)
    year_obtained: date | None = Field(default=None)


# Database model, database table inferred from class name
class ProfessionalSpecialization(ProfessionalSpecializationBase, table=True):
    professional_id: int = Field(foreign_key="professional.id", primary_key=True)
    specialization_id: int = Field(foreign_key="specialization.id", primary_key=True)
