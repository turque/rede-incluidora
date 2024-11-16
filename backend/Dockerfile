FROM python:3.11-slim AS builder

# Crie um grupo e um usuário padrão
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /app/

# Instale curl e outras dependências necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Instale o Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    ln -s /opt/poetry/bin/poetry /usr/local/bin/poetry && \
    poetry config virtualenvs.create false

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./pyproject.toml ./poetry.lock* /app/

EXPOSE 8000

FROM builder AS development

RUN poetry install --no-root

CMD [ "fastapi", "dev" ]

FROM builder AS production

RUN poetry install --no-root --only main

ENV PYTHONPATH=/app

COPY ./scripts/ /app/

COPY ./alembic.ini /app/

COPY ./prestart.sh /app/

COPY ./tests-start.sh /app/

COPY ./app /app/app

RUN chmod +x /app/prestart.sh && \
    chmod +x /app/tests-start.sh

# Ajuste as permissões e mude para o usuário padrão
RUN chown -R appuser:appgroup /app
USER appuser

# Comando padrão
CMD ["fastapi", "run"]
