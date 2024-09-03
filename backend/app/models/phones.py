from sqlmodel import Field, Relationship, SQLModel

from .users import User


# Shared properties
class PhoneBase(SQLModel):
    phone_number: str | None = Field(default=None)
    phone_type: str | None = Field(default=None)
    has_whatsapp: bool = Field(default=False)
    has_telegram: bool = Field(default=False)
    is_primary: bool = Field(default=False)
    usage_type: str | None = Field(default=None)


# Properties to receive via API on creation
class PhoneCreate(PhoneBase):
    pass


# Properties to receive via API on update, all are optional
class PhoneUpdate(PhoneBase):
    pass


# Database model, database table inferred from class name
class Phone(PhoneBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    user: User | None = Relationship(back_populates="phones")


# Properties to return via API, id is always required
class PhonePublic(PhoneBase):
    id: int


class PhonesPublic(SQLModel):
    data: list[PhonePublic]
    count: int
