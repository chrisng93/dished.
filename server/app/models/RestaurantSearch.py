from ..app import db


# enums
TRANSPORT_METHODS = ('DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING')


class RestaurantSearch(db.Model):
    __tablename__ = 'restaurant_search'
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(400), index=True, nullable=False)
    transport_method = db.Column(db.Enum(TRANSPORT_METHODS), index=True, nullable=False)
    desired_travel_time = db.Column(db.Integer, index=True, nullable=False)
    food_type = db.Column(db.String(120), index=True, nullable=False)
    selection = db.Column(db.String(120), index=True)
    rating = db.Column(db.Integer, index=True)
    comments = db.Column(db.String(1000), index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, location, transport_method, desired_travel_time, food_type):
        self.location = location
        self.transport_method = transport_method
        self.desired_travel_time = desired_travel_time
        self.food_type = food_type

    def __repr__(self):
        return '<User %r>' % self.id
