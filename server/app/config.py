import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True

SECRET_KEY = 'secret'
TOKEN_EXPIRY = 86400  # in seconds

GOOGLE_API_URL = 'https://maps.googleapis.com'
GOOGLE_API_KEY = 'AIzaSyAn8L8g_yycTRfS-TmEqcfN4mGgD7ixRPA'

YELP_APP_ID = 'q9muNPdaGwv_outr1dOxtg'
YELP_APP_SECRET = 'sVJ3PCwEY8CVF4aOKzPwIzDq7MOkfqZ44apQPynFVufX5GUHwjInnGfpUsfsREOO'
YELP_ACCESS_TOKEN = ''

AVERAGE_CAR_SPEED = 40
AVERAGE_TRANSIT_SPEED = 15
AVERAGE_BICYCLING_SPEED = 10
AVERAGE_WALKING_SPEED = 7

EARTH_RADIUS = 3961  # miles
