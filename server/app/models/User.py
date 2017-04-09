from ..app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, index=True, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    name = db.Column(db.String(64))
    location = db.Column(db.String(400))
    restaurant_searches = db.relationship('RestaurantSearch', backref='user', lazy='dynamic')

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.email
