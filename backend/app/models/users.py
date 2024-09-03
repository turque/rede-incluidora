from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

Address = "app.models.addresses.Address"
Phone = "app.models.phones.Phone"
ProfessionalData = "app.models.professionals.ProfessionalData"
SocialMediaContact = "app.models.social_media.SocialMediaContact"


# Shared properties
class UserBase(SQLModel):
    email: EmailStr | None = Field(unique=True, index=True)
    password: str | None
    is_active: bool | None = Field(default=False)
    is_superuser: bool | None = Field(default=False)
    full_name: str | None = Field(default=None)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    addresses: list["Address"] = Relationship(back_populates="user")  # type: ignore
    phones: list["Phone"] = Relationship(back_populates="user")  # type: ignore
    social_media_contacts: list["SocialMediaContact"] = Relationship(  # type: ignore
        back_populates="user"
    )
    professional_data: list["ProfessionalData"] = Relationship(back_populates="user")  # type: ignore


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int
