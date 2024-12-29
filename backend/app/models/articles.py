import uuid
from datetime import datetime, timezone

from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import TEXT
from sqlmodel import Field, SQLModel


# Shared properties
class ArticleBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    summary: str = Field(min_length=100, max_length=1024)
    content: str = Field(default=None, sa_column=Column(TEXT))
    published: bool = False
    created_at: datetime = Field(default=datetime.now(timezone.utc))


class ArticleCreate(ArticleBase):
    pass


class Article(ArticleBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id",
        nullable=False,
    )


class ArticlePublic(ArticleBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ArticlesPublic(SQLModel):
    data: list[ArticlePublic]
    count: int
