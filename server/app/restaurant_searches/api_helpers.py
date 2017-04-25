import requests
from urllib.parse import urlparse
from .location_helpers import miles_to_meters
from .. import config


def get_yelp_access_token():
    data = dict(
        grant_type='client_credentials',
        client_id=config.YELP_APP_ID,
        client_secret=config.YELP_APP_SECRET
    )
    req = requests.post('https://api.yelp.com/oauth2/token', data=data)
    results = req.json()
    config.YELP_ACCESS_TOKEN = results['access_token']


def hit_yelp(location, radius, food, transit_time):
    prefix = 'https://api.yelp.com/v3/businesses/search'
    radius_in_meters = miles_to_meters(radius)
    limit = 50
    url = urlparse('%s?term=%s&latitude=%s&longitude=%s&radius=%s&limit=%s' % (prefix, food, location[0], location[1],
                                                                               int(radius_in_meters), limit))
    full_url = '%s://%s%s?%s' % (url.scheme, url.netloc, url.path, url.query)
    headers = dict(authorization='Bearer %s' % config.YELP_ACCESS_TOKEN)
    req = requests.get(full_url, headers=headers)
    # TODO: check to see if access token is expired, if expired then get access token
    results = req.json()
    return [r for r in results['businesses'] if r['distance'] < radius_in_meters]
