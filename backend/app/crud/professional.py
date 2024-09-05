from sqlmodel import Session, select

from app.models import Professional, Specialization, User


def get_professionals(*, session: Session) -> list[Professional]:
    statement = select(Professional, User).where(Professional.user == User.id)
    professionals = session.exec(statement).all()
    return professionals


def get_professionals_by_specialization(
    *, session: Session, specialization: str
) -> list[Professional]:
    statement = (
        select(Professional)
        .join(Specialization, Specialization.id_professional == Professional.id)
        .where(Specialization.specialization == specialization)
    )
    professionals = session.exec(statement).all()
    return professionals
