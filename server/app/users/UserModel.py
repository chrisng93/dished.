"""
    Define User model
"""
import jwt
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from ..common.extensions import db
from ..common.exceptions import InvalidField
from .. import config


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, index=True, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(64))
    location = db.Column(db.String(400))
    restaurant_searches = db.relationship('RestaurantSearch', backref='user', lazy='dynamic')

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            print(k, v)
            if k == 'password':
                self.set_password(v)
            else:
                setattr(self, k, v)

    def __repr__(self):
        return '<User %r>' % self.email

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name != 'password'}

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address
        return address

    def encode_auth_token(self):
        try:
            payload = {
                'exp': datetime.now() + timedelta(days=1, seconds=0),
                'iat': datetime.now(),
                'sub': self.get_id()
            }
            return jwt.encode(
                payload,
                config.SECRET_KEY
            )
        except Exception as e:
            return str(e)

    def get_id(self):
        return getattr(self, 'id')

    def get(self, field):
        if field not in self.__table__.columns.keys():
            raise InvalidField('Attempting to get field %s from User model' % field)
        return getattr(self, field)

    def set_password(self, password):
        self.password = generate_password_hash(password)
        print(password, self.password)

    def validate_password(self, password):
        return check_password_hash(self.password, password)
