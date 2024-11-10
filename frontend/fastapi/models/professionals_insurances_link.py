from sqlmodel import Field, SQLModel


# Database model, database table inferred from class name
class ProfessionalInsurance(SQLModel, table=True):
    professional_id: int = Field(foreign_key="professional.id", primary_key=True)
    insurance_id: int = Field(foreign_key="insurance.id", primary_key=True)
