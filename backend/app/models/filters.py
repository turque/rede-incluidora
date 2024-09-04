from sqlmodel import SQLModel


class Filters(SQLModel):
    states: list[str]
    insurances: list[str]
    specializations: list[str]
