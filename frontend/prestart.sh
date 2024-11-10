#! /usr/bin/env bash

# Let the DB start
python ~/fastapi/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python ~/fastapi/initial_data.py
