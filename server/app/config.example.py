"""
    Example config
"""
import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True

REDIS_URL = 'redis://0.0.0.0:6379/0'

SECRET_KEY = ''
TOKEN_EXPIRY = 86400  # in seconds

GOOGLE_API_URL = 'https://maps.googleapis.com'
GOOGLE_API_KEY = ''

YELP_APP_ID = ''
YELP_APP_SECRET = ''
YELP_ACCESS_TOKEN = ''

AVERAGE_CAR_SPEED = 40
AVERAGE_TRANSIT_SPEED = 15
AVERAGE_BICYCLING_SPEED = 10
AVERAGE_WALKING_SPEED = 7

EARTH_RADIUS = 3961  # miles
