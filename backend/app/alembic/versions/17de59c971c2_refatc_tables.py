"""Refatc tables

Revision ID: 17de59c971c2
Revises:
Create Date: 2024-12-29 16:37:32.923918

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '17de59c971c2'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('insurance',
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('professional',
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('treatment', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('self_description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('home_care', sa.Boolean(), nullable=False),
    sa.Column('accepts_insurance', sa.Boolean(), nullable=False),
    sa.Column('remote_appointment', sa.Boolean(), nullable=False),
    sa.Column('in_person_appointment', sa.Boolean(), nullable=False),
    sa.Column('avatar_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('verified', sa.Boolean(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('specialization',
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('user',
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('full_name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_table('address',
    sa.Column('street', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('number', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('complement', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('neighborhood', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('city', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('state', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('postal_code', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('professional_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('article',
    sa.Column('title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.Column('summary', sqlmodel.sql.sqltypes.AutoString(length=1024), nullable=False),
    sa.Column('content', sa.TEXT(), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('owner_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('phone',
    sa.Column('phone_number', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('phone_type', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('has_whatsapp', sa.Boolean(), nullable=False),
    sa.Column('has_telegram', sa.Boolean(), nullable=False),
    sa.Column('is_primary', sa.Boolean(), nullable=False),
    sa.Column('usage_type', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('professional_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('post',
    sa.Column('title', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('content', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('author_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('professionalinsurance',
    sa.Column('professional_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('insurance_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['insurance_id'], ['insurance.id'], ),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('professional_id', 'insurance_id')
    )
    op.create_table('professionalspecialization',
    sa.Column('professional_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('specialization_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.ForeignKeyConstraint(['specialization_id'], ['specialization.id'], ),
    sa.PrimaryKeyConstraint('professional_id', 'specialization_id')
    )
    op.create_table('socialmedia',
    sa.Column('platform', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('profile_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('professional_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('socialmedia')
    op.drop_table('professionalspecialization')
    op.drop_table('professionalinsurance')
    op.drop_table('post')
    op.drop_table('phone')
    op.drop_table('article')
    op.drop_table('address')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('specialization')
    op.drop_table('professional')
    op.drop_table('insurance')
    # ### end Alembic commands ###