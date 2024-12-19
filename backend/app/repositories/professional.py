from sqlmodel import Session, select

from app.models import (
    Address,
    Insurance,
    Professional,
    ProfessionalDataPublic,
    ProfessionalInsurance,
    ProfessionalSpecialization,
    Specialization,
)


def get_filters(filters: list[dict] | None) -> list:
    """
    Generates a list of conditions based on the provided filters.

    Args:
        filters (list[dict] | None): A list of filter dictionaries or None.
                     Each dictionary should have a "type" key which can be
                     "specialization", "city", or "insurance", and a "value"
                     key with the corresponding value to filter by.

    Returns:
        list: A list of conditions based on the provided filters. Each
            condition is an equality comparison between a field and a value.
    """
    conditions = []
    if filters:
        for filter_item in filters:
            if filter_item["type"] == "specialization":
                conditions.append(
                    ProfessionalSpecialization.professional_id == Professional.id
                )
                conditions.append(
                    ProfessionalSpecialization.specialization_id == Specialization.id
                )
                conditions.append(Specialization.name == filter_item["value"])
            elif filter_item["type"] == "city":
                conditions.append(Address.professional_id == Professional.id)
                conditions.append(Address.city == filter_item["value"])
            elif filter_item["type"] == "insurance":
                conditions.append(
                    ProfessionalInsurance.professional_id == Professional.id
                )
                conditions.append(ProfessionalInsurance.insurance_id == Insurance.id)
                conditions.append(Insurance.name == filter_item["value"])
    return conditions


def get_professionals(
    *,
    session: Session,
    filters: list[dict] | None = None,
) -> list[ProfessionalDataPublic]:
    """
    Retrieve a list of professionals from the database with optional filtering.

    Args:
        session (Session): The database session to use for the query.
        filters (list[dict] | None, optional): A list of filter conditions to
        apply to the query. Each filter should be a dictionary representing a
        condition. Defaults to None.

    Returns:
        list[ProfessionalDataPublic]: A list of professionals matching the
        filter conditions, validated against the ProfessionalDataPublic model.
    """
    conditions = get_filters(filters)

    statement = select(Professional).distinct().where(Professional.active)
    if conditions:
        for condition in conditions:
            statement = statement.where(condition)

    professionals = session.exec(statement).all()
    return [
        ProfessionalDataPublic.model_validate(professional)
        for professional in professionals
    ]


def get_professional_by_id(
    professional_id: int, session: Session
) -> ProfessionalDataPublic | None:
    """
    Retrieve a professional's public data by their ID.

    Args:
        professional_id (int): The ID of the professional to retrieve.
        session (Session): The database session to use for the query.

    Returns:
        ProfessionalDataPublic | None: The public data of the professional
        if found, otherwise None.
    """
    statement = select(Professional).where(Professional.id == professional_id)
    professional = session.exec(statement).one_or_none()
    if professional:
        return ProfessionalDataPublic.model_validate(professional)
    return None
