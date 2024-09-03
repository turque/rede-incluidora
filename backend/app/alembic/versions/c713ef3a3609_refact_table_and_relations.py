"""Refact table and relations

Revision ID: c713ef3a3609
Revises: 9e3a64beb834
Create Date: 2024-09-03 11:58:29.213676

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'c713ef3a3609'
down_revision: Union[str, None] = '9e3a64beb834'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('address', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_constraint('professional_user_id_fkey', 'professional', type_='foreignkey')
    op.drop_column('professional', 'user_id')
    op.alter_column('socialmedia', 'is_primary',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.add_column('user', sa.Column('password', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.alter_column('user', 'email',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.alter_column('user', 'is_superuser',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'is_superuser',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.alter_column('user', 'email',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    op.drop_column('user', 'password')
    op.alter_column('socialmedia', 'is_primary',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.add_column('professional', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('professional_user_id_fkey', 'professional', 'user', ['user_id'], ['id'])
    op.alter_column('address', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
