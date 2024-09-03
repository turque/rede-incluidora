from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .users import User  # noqa: F401


# Shared properties
class SocialMediaBase(SQLModel):
    platform: str | None = Field(default=None)
    username: str | None = Field(default=None)
    profile_url: str | None = Field(default=None)
    is_primary: bool | None = Field(default=False)
    usage_type: str | None = Field(default=None)


# Database model, database table inferred from class name
class SocialMedia(SocialMediaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: "User" = Relationship(back_populates="social_media_contacts")


# Properties to receive via API on creation
class SocialMediaCreate(SocialMediaBase):
    pass


# Properties to receive via API on update, all are optional
class SocialMediaUpdate(SocialMediaBase):
    pass


# Properties to return via API, id is always required
class SocialMediaPublic(SocialMediaBase):
    id: int


class SocialMediasPublic(SQLModel):
    data: list[SocialMediaPublic]
    count: int
