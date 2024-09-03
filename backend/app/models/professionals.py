from sqlmodel import Field, Relationship, SQLModel

from .specializations import Specialization
from .users import User

ProfessionalInsurance = "app.models.professional_insurrances.ProfessionalInsurance"


# Shared properties
class ProfessionalBase(SQLModel):
    self_description: str | None = Field(default=None)
    home_service: bool = False
    accepts_insurance: bool = False
    private_only: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False


# Properties to receive via API on creation
class ProfessionalCreate(ProfessionalBase):
    pass


# Properties to receive via API on update, all are optional
class ProfessionalUpdate(ProfessionalBase):
    self_description: str | None = Field(default=None)
    home_service: bool | None = Field(default=False)
    accepts_insurance: bool | None = Field(default=False)
    private_only: bool | None = Field(default=False)
    remote_appointment: bool | None = Field(default=False)
    in_person_appointment: bool | None = Field(default=False)


# Database model, database table inferred from class name
class Professional(ProfessionalBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user: User | None = Relationship(back_populates="professional_data")
    specializations: list["Specialization"] = Relationship(
        back_populates="professional"
    )
    insurances: list["ProfessionalInsurance"] = Relationship(  # type: ignore
        back_populates="professional"
    )


# Properties to return via API, id is always required
class ProfessionalPublic(ProfessionalBase):
    id: int


class ProfessionalsPublic(SQLModel):
    data: list[ProfessionalPublic]
    count: int
