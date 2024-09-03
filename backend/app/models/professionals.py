from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

from .users import User

if TYPE_CHECKING:
    from .professional_insurances import ProfessionalInsurance  # noqa: F401
    from .specializations import Specialization  # noqa: F401


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
    user: "User" = Relationship(back_populates="professional_data")
    specializations: list["Specialization"] = Relationship(
        back_populates="professional"
    )
    insurances: list["ProfessionalInsurance"] = Relationship(  # type: ignore
        back_populates="professional"
    )


# Properties to receive via API on creation
class ProfessionalCreate(ProfessionalBase):
    pass


# Properties to receive via API on update, all are optional
class ProfessionalUpdate(ProfessionalBase):
    pass


# Properties to return via API, id is always required
class ProfessionalPublic(ProfessionalBase):
    id: int


class ProfessionalsPublic(SQLModel):
    data: list[ProfessionalPublic]
    count: int
