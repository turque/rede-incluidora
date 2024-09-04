from fastapi import APIRouter

from app.api.deps import SessionDep
from app.crud import filters
from app.models import Filters

router = APIRouter()


@router.get("/", response_model=Filters)
def get_filters(session: SessionDep) -> Filters:
    return filters.get_filters(session=session)
