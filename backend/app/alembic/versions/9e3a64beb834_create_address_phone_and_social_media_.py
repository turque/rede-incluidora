"""Create address, phone and social media  model

Revision ID: 9e3a64beb834
Revises: c2f9932927f8
Create Date: 2024-09-02 15:06:31.644466

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '9e3a64beb834'
down_revision: Union[str, None] = 'c2f9932927f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('address',
    sa.Column('street', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('number', sqlmodel.sql.sqltypes.AutoString(length=10), nullable=True),
    sa.Column('complement', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('neighborhood', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('city', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('state', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('postal_code', sqlmodel.sql.sqltypes.AutoString(length=15), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('phone',
    sa.Column('phone_number', sqlmodel.sql.sqltypes.AutoString(length=30), nullable=True),
    sa.Column('phone_type', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
    sa.Column('has_whatsapp', sa.Boolean(), nullable=False),
    sa.Column('has_telegram', sa.Boolean(), nullable=False),
    sa.Column('is_primary', sa.Boolean(), nullable=False),
    sa.Column('usage_type', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('socialmedia',
    sa.Column('platform', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('username', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=True),
    sa.Column('profile_url', sqlmodel.sql.sqltypes.AutoString(length=1024), nullable=True),
    sa.Column('is_primary', sa.Boolean(), nullable=False),
    sa.Column('usage_type', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('socialmedia')
    op.drop_table('phone')
    op.drop_table('address')
    # ### end Alembic commands ###
