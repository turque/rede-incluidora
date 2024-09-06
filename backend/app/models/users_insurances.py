from sqlmodel import Field, SQLModel


# Database model, database table inferred from class name
class UserInsurance(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    insurance_id: int = Field(foreign_key="insurance.id", primary_key=True)
