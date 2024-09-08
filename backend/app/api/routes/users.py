from typing import Any

from fastapi import APIRouter

from app.api.deps import SessionDep
from app.crud import user
from app.models import UserPublic

router = APIRouter()


# TODO remover
@router.get(
    "/",
    response_model=list[UserPublic],
)
def read_users(session: SessionDep) -> Any:
    """
    Retrieve users.
    """
    return user.get_users(session=session)


@router.get("/{user_id}", response_model=UserPublic)
def read_user_by_id(user_id: int, session: SessionDep) -> UserPublic | None:
    """
    Get a specific user by id.
    """
    result = user.get_user_by_id(user_id=user_id, session=session)
    if result is None:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="User not found")
    return result
