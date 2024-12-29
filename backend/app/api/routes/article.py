from fastapi import APIRouter

from app.api.deps import SessionDep
from app.models import ArticleCreate, ArticlePublic
from app.repositories import article

router = APIRouter()


@router.get("/", response_model=list[ArticlePublic])
def get_articles(session: SessionDep) -> list[ArticlePublic]:
    return article.get_articles(session=session)


@router.get("/{article_id}", response_model=ArticlePublic)
def get_article_by_id(article_id: int, session: SessionDep) -> ArticlePublic:
    return article.get_by_id(article_id=article_id, session=session)


@router.post("/", response_model=ArticlePublic)
def create_article(article: ArticleCreate, session: SessionDep) -> ArticlePublic:
    return article.create(session=session, article=article)
