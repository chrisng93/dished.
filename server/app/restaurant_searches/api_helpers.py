"""
    Helpers for Yelp API
"""
import requests
from urllib.parse import urlparse
from .location_helpers import miles_to_meters
from .. import config


def get_yelp_access_token():
    try:
        data = dict(
            grant_type='client_credentials',
            client_id=config.YELP_APP_ID,
            client_secret=config.YELP_APP_SECRET
        )
        req = requests.post('https://api.yelp.com/oauth2/token', data=data)
        results = req.json()
        config.YELP_ACCESS_TOKEN = results['access_token']
    except Exception as e:
        print('Error connecting to Yelp API: %s' % str(e))


def hit_yelp(location, radius, food, transit_time):
    try:
        prefix = 'https://api.yelp.com/v3/businesses/search'
        radius_in_meters = miles_to_meters(radius)
        limit = 50
        url = urlparse('%s?term=%s&latitude=%s&longitude=%s&radius=%s&limit=%s' % (prefix, food, location[0], location[1],
                                                                                   int(radius_in_meters), limit))
        full_url = '%s://%s%s?%s' % (url.scheme, url.netloc, url.path, url.query)
        headers = dict(authorization='Bearer %s' % config.YELP_ACCESS_TOKEN)
        req = requests.get(full_url, headers=headers)
        if req.status_code != 200:
            get_yelp_access_token()
            hit_yelp(location, radius, food, transit_time)
        results = req.json()
        return [r for r in results['businesses'] if r['distance'] < radius_in_meters and food.lower() in [category['alias'].lower() for category in r['categories']]]
    except Exception as e:
        print('Error connecting to Yelp API: %s' % str(e))
