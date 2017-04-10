"""create users and restaurant_searches s tables

Revision ID: 38425c1b176b
Revises: 
Create Date: 2017-04-09 20:15:57.273844

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38425c1b176b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('password', sa.String(length=120), nullable=False),
        sa.Column('name', sa.String(length=64), nullable=True),
        sa.Column('location', sa.String(length=400), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_table('restaurant_searches',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('user_location', sa.String(length=400), nullable=False),
        sa.Column('transport_method', sa.String(length=120), nullable=False),
        sa.Column('desired_travel_time', sa.Enum(), nullable=False),
        sa.Column('food_type', sa.String(length=120), nullable=False),
        sa.Column('selection', sa.String(length=400120), nullable=True),
        sa.Column('rating', sa.Integer(), nullable=True),
        sa.Column('comments', sa.String(length=1000), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id'),
        )


def downgrade():
    op.drop_table('users')
    op.drop_table('restaurant_searches')
