from typing import TYPE_CHECKING, Optional

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from .addresses import Address
from .phones import Phone
from .social_media import SocialMedia
from .users_insurances import UserInsurance
from .users_specializations import UserSpecialization

if TYPE_CHECKING:
    from .insurances import Insurance  # noqa: F401
    from .professionals_data import Professional  # noqa: F401
    from .specializations import Specialization  # noqa: F401


# Shared properties
class UserBase(SQLModel):
    email: EmailStr | None = Field(unique=True, index=True)
    is_active: bool | None = Field(default=False)
    is_superuser: bool | None = Field(default=False)
    name: str | None = Field(default=None)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str | None
    addresses: list["Address"] = Relationship(back_populates="user")
    phones: list["Phone"] = Relationship(back_populates="user")
    social_medias: list["SocialMedia"] = Relationship(back_populates="user")
    specializations: list["Specialization"] = Relationship(
        back_populates="user", link_model=UserSpecialization
    )
    insurances: list["Insurance"] | None = Relationship(
        back_populates="user", link_model=UserInsurance
    )
    professional_data: Optional["Professional"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"uselist": False}
    )


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class UserPublicAll(UserPublic):
    addresses: list["Address"] | None
    phones: list["Phone"] | None
    social_medias: list["SocialMedia"] | None
    specialization: list["UserSpecialization"] | None
    insurances: list["UserInsurance"] | None
    professional_data: Optional["Professional"] | None
