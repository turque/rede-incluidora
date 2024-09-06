from sqlmodel import Field, Relationship, SQLModel

from .users import User
from .users_insurances import UserInsurance


class InsuranceBase(SQLModel):
    name: str | None = Field(default=None)


class Insurance(InsuranceBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    users: list[User] = Relationship(
        back_populates="insurances", link_model=UserInsurance
    )
