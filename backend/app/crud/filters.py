from sqlmodel import Session, select

from app.models import Address, Filters, Insurance, Specialization


def get_filters(*, session: Session) -> Filters:
    states_query = select(Address.state).distinct()
    states = session.exec(states_query).all()

    insurances_query = select(Insurance.name).distinct()
    insurances = session.exec(insurances_query).all()

    specializations_query = select(Specialization.specialization).distinct()
    specializations = session.exec(specializations_query).all()

    return Filters(
        states=states, insurances=insurances, specializations=specializations
    )
