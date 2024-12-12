from sqlmodel import Session, select

from app.models import Post, PostPublic, PostsPublic


def get_posts(*, session: Session) -> PostsPublic:
    statement = select(Post).where(Post.published)
    posts = session.exec(statement).all()
    return posts


def get_by_id(post_id: int, session: Session) -> PostPublic | None:
    statement = select(Post).where(Post.id == post_id)
    post = session.exec(statement).one()
    return post
