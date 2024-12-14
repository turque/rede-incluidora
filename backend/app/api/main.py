from fastapi import APIRouter

from app.api.routes import article, login, post, searchs, users, utils

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(searchs.router, prefix="/search", tags=["search"])
api_router.include_router(post.router, prefix="/post", tags=["posts"])
api_router.include_router(article.router, prefix="/article", tags=["articles"])
