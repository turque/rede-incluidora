from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from .users import User


# Shared properties
class ProfessionalBase(SQLModel):
    self_description: str | None = Field(default=None, max_length=1024)
    home_service: bool = False
    accepts_insurance: bool = False
    private_only: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False


# Properties to receive via API on creation
class ProfessionalCreate(ProfessionalBase):
    pass


class ProfessionalRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class ProfessionalUpdate(ProfessionalBase):
    self_description: str | None = Field(default=None, max_length=1024)
    home_service: bool = False
    accepts_insurance: bool = False
    private_only: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False


# Database model, database table inferred from class name
class Professional(ProfessionalBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: "User" = Relationship(back_populates="user_data")


# Properties to return via API, id is always required
class ProfessionalPublic(ProfessionalBase):
    id: int


class ProfessionalsPublic(SQLModel):
    data: list[ProfessionalPublic]
    count: int
