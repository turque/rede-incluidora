FROM python:3.11-slim

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

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --only main ; fi"

ENV PYTHONPATH=/app

COPY ./scripts/ /app/

COPY ./alembic.ini /app/

COPY ./prestart.sh /app/

COPY ./tests-start.sh /app/

COPY ./app /app/app

RUN chmod +x /app/scripts/prestart.sh

ENTRYPOINT [ "/app/scripts/prestart.sh" ]

EXPOSE 8000

CMD [ "fastapi", "run" ]
