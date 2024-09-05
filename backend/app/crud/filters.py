from sqlmodel import Session, select

from app.models import Address, Filters  # , Insurance, Specialization


def get_filters(*, session: Session) -> Filters:
    city_query = select(Address.city).distinct()
    city = session.exec(city_query).all()

    # insurances_query = select(Insurance.name).distinct()
    # insurances = session.exec(insurances_query).all()

    # specializations_query = select(Specialization.specialization).distinct()
    # specializations = session.exec(specializations_query).all()

    return Filters(city=city, insurances=[], specializations=[])
