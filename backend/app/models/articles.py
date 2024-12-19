from datetime import datetime, timezone

from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import TEXT
from sqlmodel import Field, SQLModel


# Shared properties
class ArticleBase(SQLModel):
    title: str | None = Field(default=None)
    summary: str | None = Field(default=None)
    content: str | None = Field(default=None, sa_column=Column(TEXT))
    published: bool = False
    created_at: datetime = Field(default=datetime.now(timezone.utc))


class Article(ArticleBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    author_id: int = Field(foreign_key="user.id")


class ArticlePublic(ArticleBase):
    id: int
