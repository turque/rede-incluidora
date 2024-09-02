from sqlmodel import Field, Relationship, SQLModel

from .users import User


# Shared properties
class SocialMediaBase(SQLModel):
    platform: str | None = Field(default=None, max_length=256)
    username: str | None = Field(default=None, max_length=256)
    profile_url: str | None = Field(default=None, max_length=1024)
    is_primary: bool = False
    usage_type: str | None = Field(default=None, max_length=100)


# Properties to receive via API on creation
class SocialMediaCreate(SocialMediaBase):
    pass


# Properties to receive via API on update, all are optional
class SocialMediaUpdate(SocialMediaBase):
    pass


# Database model, database table inferred from class name
class SocialMedia(SocialMediaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: "User" = Relationship(back_populates="user_social_media")


# Properties to return via API, id is always required
class SocialMediaPublic(SocialMediaBase):
    id: int


class SocialMediasPublic(SQLModel):
    data: list[SocialMediaPublic]
    count: int
