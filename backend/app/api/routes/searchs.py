from fastapi import APIRouter, HTTPException, Query

from app.api.deps import SessionDep
from app.crud import filters, professional
from app.models import Filters, ProfessionalDataPublic

router = APIRouter()


@router.get("/filters", response_model=Filters)
def get_filters(session: SessionDep) -> Filters:
    return filters.get_filters(session=session)


@router.get("/{professional_id}", response_model=ProfessionalDataPublic)
def read_professional_by_id(
    professional_id: int, session: SessionDep
) -> ProfessionalDataPublic | None:
    result = professional.get_professional_by_id(
        professional_id=professional_id, session=session
    )
    if result is None:
        raise HTTPException(status_code=404, detail="Professional not found")
    return result


@router.get("/", response_model=list[ProfessionalDataPublic])
def get_professionals(
    session: SessionDep,
    specialization: str | None = Query(None),
    city: str | None = Query(None),
    insurance: str | None = Query(None),
) -> list[ProfessionalDataPublic]:
    filters = []
    if specialization:
        filters.append({"type": "specialization", "value": specialization})
    if city:
        filters.append({"type": "city", "value": city})
    if insurance:
        filters.append({"type": "insurance", "value": insurance})

    professionals = professional.get_professionals(session=session, filters=filters)
    return professionals
