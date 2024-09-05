from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .insurances import Insurance  # noqa: F401
    from .professionals_specializations import Specialization  # noqa: F401
    from .users import User


# Shared properties
class ProfessionalBase(SQLModel):
    self_description: str | None = Field(default=None)
    home_service: bool = False
    accepts_insurance: bool = False
    private_only: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False


# Database model, database table inferred from class name
class Professional(ProfessionalBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)
    specializations: list["Specialization"] = Relationship(
        back_populates="professionals", link_model="ProfessionalSpecialization"
    )
    insurances: list["Insurance"] = Relationship(
        back_populates="professionals", link_model="ProfessionalInsurance"
    )
    user: "User" = Relationship(back_populates="professional")
