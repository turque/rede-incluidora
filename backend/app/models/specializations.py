from sqlmodel import Field, Relationship, SQLModel

from .users import User
from .users_specializations import UserSpecialization


# Shared properties
class SpecializationBase(SQLModel):
    name: str | None = Field(default=None)


class Specialization(SpecializationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    users: list[User] = Relationship(
        back_populates="specializations", link_model=UserSpecialization
    )
