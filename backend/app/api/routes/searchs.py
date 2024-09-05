from fastapi import APIRouter

from app.api.deps import SessionDep
from app.crud import filters  # , professional
from app.models import Filters

router = APIRouter()


@router.get("/filters", response_model=Filters)
def get_filters(session: SessionDep) -> Filters:
    return filters.get_filters(session=session)


# @router.get("/")
# def get_professionals(session: SessionDep, specialization: str = None, city: str = None, insurance: list[str] = None): # -> ProfessionalsPublic:
#     professionals = professional.get_professionals(session=session)
#     return professionals
