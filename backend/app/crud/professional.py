from sqlmodel import Session, select

from app.models import (
    Address,
    Insurance,
    Professional,
    ProfessionalDataPublic,
    Specialization,
)


def get_filters(filters: list[dict] | None) -> list:
    conditions = []
    if filters:
        for filter in filters:
            if filter["type"] == "specialization":
                conditions.append(Specialization.name == filter["value"])
            elif filter["type"] == "city":
                conditions.append(Address.city == filter["value"])
            elif filter["type"] == "insurance":
                conditions.append(Insurance.name == filter["value"])
    return conditions


def get_professionals(
    *, session: Session, filters: list[dict] | None = None
) -> list[ProfessionalDataPublic]:
    conditions = get_filters(filters)

    statement = select(Professional)
    if conditions:
        for condition in conditions:
            statement = statement.where(condition)

    professionals = session.exec(statement).all()
    return professionals


def get_professional_by_id(
    professional_id: int, session: Session
) -> ProfessionalDataPublic | None:
    statement = select(Professional).where(Professional.id == professional_id)
    professional = session.exec(statement).one_or_none()
    return professional
