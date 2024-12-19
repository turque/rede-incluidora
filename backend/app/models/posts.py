from datetime import datetime, timezone

from sqlmodel import Field, SQLModel


# Shared properties
class PostBase(SQLModel):
    title: str | None = Field(default=None)
    content: str | None = Field(default=None)
    published: bool = False
    created_at: datetime = Field(default=datetime.now(timezone.utc))


class Post(PostBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    author_id: int = Field(foreign_key="user.id")
    # author: "User" = Relationship(back_populates="posts")


class PostPublic(PostBase):
    id: int


class PostsPublic(PostPublic):
    posts: list[PostPublic] | None
