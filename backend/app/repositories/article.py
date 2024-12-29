from sqlmodel import Session, select

from app.models import Article, ArticlePublic


def get_articles(*, session: Session) -> ArticlePublic:
    statement = select(Article).where(Article.published)
    articles = session.exec(statement).all()
    return articles


def get_by_id(article_id: int, session: Session) -> ArticlePublic | None:
    statement = select(Article).where(Article.id == article_id)
    article = session.exec(statement).one()
    return article


def create(*, session: Session, article: Article) -> Article:
    session.add(article)
    session.commit()
    session.refresh(article)
    return article
