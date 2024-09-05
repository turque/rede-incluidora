from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from .addresses import Address  # noqa: F401
from .phones import Phone  # noqa: F401
from .social_media import SocialMedia  # noqa: F401

# if TYPE_CHECKING:
# from .professionals import Professional  # noqa: F401


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
    # professional: Optional["Professional"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class UserPublicAll(UserPublic):
    addresses: list["Address"] | None
    phones: list["Phone"] | None
    social_medias: list["SocialMedia"] | None
