from sqlmodel import Field, SQLModel


class InsuranceBase(SQLModel):
    name: str | None = Field(default=None)


class Insurance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)


class InsuranceCreate(InsuranceBase):
    pass


class InsuranceUpdate(InsuranceBase):
    pass


class InsurancePublic(InsuranceBase):
    id: int


class InsurancesPublic(SQLModel):
    data: list[InsurancePublic]
    count: int
