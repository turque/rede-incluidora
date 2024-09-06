from sqlmodel import Field, SQLModel


# Database model, database table inferred from class name
class UserSpecialization(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    specialization_id: int = Field(foreign_key="specialization.id", primary_key=True)
