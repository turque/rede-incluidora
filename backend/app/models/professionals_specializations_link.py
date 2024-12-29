import uuid

from sqlmodel import Field, SQLModel


# Database model, database table inferred from class name
class ProfessionalSpecialization(SQLModel, table=True):
    professional_id: uuid.UUID = Field(foreign_key="professional.id", primary_key=True)
    specialization_id: uuid.UUID = Field(
        foreign_key="specialization.id", primary_key=True
    )
