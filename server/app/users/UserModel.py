"""
    Define User model
"""
from datetime import datetime
from app.extensions import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, index=True, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(64))
    location = db.Column(db.String(400))
    restaurant_searches = db.relationship('RestaurantSearch', backref='user', lazy='dynamic')

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.email

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @property
    def is_authenticated(self):
        # only return False if users should not be allowed to auth
        return True

    @property
    def is_active(self):
        # only return False if users is inactive (e.g. banned)
        return True

    @property
    def is_anonymous(self):
        # only return True if users is fake/not supposed to log in
        return False

    def get_id(self):
        return str(self.id)
