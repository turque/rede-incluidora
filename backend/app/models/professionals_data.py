from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .users import User  # noqa: F401


# Shared properties
class ProfessionalDataBase(SQLModel):
    self_description: str | None = Field(default=None)
    home_service: bool = False
    accepts_insurance: bool = False
    private_only: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False


# Database model, database table inferred from class name
class ProfessionalData(ProfessionalDataBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)
    user: "User" = Relationship(back_populates="professional_data")
