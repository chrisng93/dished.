"""
    Define User model
"""
from ..extensions import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, index=True, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(64))
    location = db.Column(db.String(400))
    restaurant_searches = db.relationship('RestaurantSearch', backref='users', lazy='dynamic')

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.email

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
