"""
    Define RestaurantSearch model
"""

from datetime import datetime
from app.extensions import db


# enums
TRANSPORT_METHODS = ('DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING')


class RestaurantSearch(db.Model):
    __tablename__ = 'restaurant_searches'
    id = db.Column(db.Integer, index=True, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    user_location = db.Column(db.String(400), nullable=False)
    transport_method = db.Column(db.Enum(TRANSPORT_METHODS), nullable=False)
    desired_travel_time = db.Column(db.Integer, nullable=False)
    food_type = db.Column(db.String(120), nullable=False)
    selection = db.Column(db.String(120))
    rating = db.Column(db.Integer)
    comments = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)

    def __init__(self, location, transport_method, desired_travel_time, food_type):
        self.location = location
        self.transport_method = transport_method
        self.desired_travel_time = desired_travel_time
        self.food_type = food_type

    def __repr__(self):
        return '<User %r>' % self.id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}