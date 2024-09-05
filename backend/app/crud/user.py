from sqlmodel import Session, select

from app.core.security import verify_password
from app.models import User, UserPublicAll


def get_users(*, session: Session) -> UserPublicAll:
    statement = select(User)
    users = session.exec(statement).all()
    return users


def get_user_by_id(user_id: int, session: Session) -> UserPublicAll | None:
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).one_or_none()
    return user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
