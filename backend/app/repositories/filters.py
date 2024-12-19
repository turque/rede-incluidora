from sqlmodel import Session, select

from app.models import Address, Filters, Insurance, Specialization


def get_filters(*, session: Session) -> Filters:
    city_query = select(Address.city).distinct()
    city = session.exec(city_query).all()

    insurances = session.exec(select(Insurance.name)).all()

    specializations = session.exec(select(Specialization.name)).all()

    return Filters(city=city, insurances=insurances, specializations=specializations)
