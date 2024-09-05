from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .users import User  # noqa: F401


# Shared properties
class SocialMediaBase(SQLModel):
    platform: str
    username: str
    profile_url: str | None = None


# Database model, database table inferred from class name
class SocialMedia(SocialMediaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="social_medias")
