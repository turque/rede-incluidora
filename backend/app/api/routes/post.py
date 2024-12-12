from fastapi import APIRouter

from app.api.deps import SessionDep
from app.models import PostPublic, PostsPublic
from app.repositories import post

router = APIRouter()


@router.get("/", response_model=list[PostPublic])
def get_posts(session: SessionDep) -> list[PostsPublic]:
    return post.get_posts(session=session)


@router.get("/{post_id}", response_model=PostPublic)
def get_post_by_id(post_id: int, session: SessionDep) -> PostPublic:
    return post.get_by_id(post_id=post_id, session=session)
