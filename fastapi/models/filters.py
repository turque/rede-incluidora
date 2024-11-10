from sqlmodel import SQLModel


class Filters(SQLModel):
    city: list[str]
    insurances: list[str]
    specializations: list[str]
