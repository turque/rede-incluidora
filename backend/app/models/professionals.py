import uuid
from datetime import datetime

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from .insurances import Insurance  # noqa: F401
from .professionals_addresses import Address
from .professionals_insurances_link import ProfessionalInsurance
from .professionals_phones import Phone
from .professionals_social_media import SocialMedia
from .professionals_specializations_link import ProfessionalSpecialization
from .specializations import Specialization  # noqa: F401


# Shared properties
class ProfessionalBase(SQLModel):
    name: str | None = Field(default=None)
    treatment: str | None = Field(default=None)
    self_description: str | None = Field(default=None)
    home_care: bool = False
    accepts_insurance: bool = False
    remote_appointment: bool = False
    in_person_appointment: bool = False
    avatar_url: str | None = Field(default=None)
    email: EmailStr | None = Field(default=None)
    verified: bool = False
    active: bool = False
    created_at: datetime | None = Field(default=None)


# Database model, database table inferred from class name
class Professional(ProfessionalBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    addresses: list["Address"] = Relationship(back_populates="professional")
    phones: list["Phone"] = Relationship(back_populates="professional")
    social_medias: list["SocialMedia"] = Relationship(back_populates="professional")
    specializations: list["Specialization"] = Relationship(
        back_populates="professionals", link_model=ProfessionalSpecialization
    )
    insurances: list["Insurance"] | None = Relationship(
        back_populates="professionals", link_model=ProfessionalInsurance
    )


class ProfessionalPublic(ProfessionalBase):
    id: uuid.UUID


class ProfessionalDataPublic(ProfessionalPublic):
    addresses: list[Address] | None
    phones: list[Phone] | None
    social_medias: list[SocialMedia] | None
    specializations: list[Specialization] | None
    insurances: list[Insurance] | None
