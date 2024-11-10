from pydantic import EmailStr
from sqlmodel import Field, SQLModel


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


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int
