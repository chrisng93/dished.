import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True

TOKEN_EXPIRY = 86400 # seconds

GOOGLE_API_KEY = ''

YELP_APP_ID = ''
YELP_APP_SECRET = ''
