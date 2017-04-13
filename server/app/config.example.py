import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True

SESSION_TYPE = ''
SECRET_KEY = ''

GOOGLE_API_KEY = ''

YELP_APP_ID = ''
YELP_APP_SECRET = ''
