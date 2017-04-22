from urllib.parse import urlparse
import requests
import json
import geopy
from geopy.distance import VincentyDistance
from .. import config
from ..common.exceptions import UnableToComplete


# def get_bound(lat1, lng1, distance, bearing):
#     origin = geopy.Point(lat1, lng1)
#     destination = VincentyDistance(miles=distance).destination(origin, bearing)
#     return destination.latitude, destination.longitude
#
#
# def calc_time(lat1, lng1, distance, bearing, transit_method):
#     # NOTE: google maps api gives duration back in seconds
#     lat2, lng2 = get_bound(lat1, lng1, distance, bearing)
#     res = requests.get('%s/maps/api/distancematrix/json?origins=%s&destinations=%s&mode=%s&key=%s' %
#                        (config.GOOGLE_API_URL, str(lat1) + ',' + str(lng1), str(lat2) + ',' + str(lng2),
#                         transit_method, config.GOOGLE_API_KEY))
#     json = res.json()
#     info = json['rows'][0]['elements'][0]
#     if info['status'] == 'ZERO_RESULTS':
#         return False
#     return info['duration']['value'] / 60
#
#
# def calculate_radius(lat, lng, travel_time, transit_method, distance=0, bearing=0):
#     if bearing == 90:
#         raise UnableToComplete('No surrounding areas found')
#
#     if distance == 0:
#         distance = calc_distance(travel_time, transit_method)
#     time = calc_time(lat, lng, distance, bearing, transit_method)
#
#     if not time:
#         return get_radius(lat, lng, travel_time, transit_method, distance, bearing + 10)
#
#     delta_percentage = (travel_time - time) / time
#     if abs(delta_percentage) > 0.15:
#         if time < int(travel_time):
#             diff = calc_distance(travel_time - time, transit_method)
#             return get_radius(lat, lng, travel_time, transit_method, distance + diff*0.1, bearing)
#         else:
#             diff = calc_distance(time - travel_time, transit_method)
#             return get_radius(lat, lng, travel_time, transit_method, distance - diff*0.1, bearing)
#     else:
#         return distance
#
#
# def calc_distance(desired_time, transit_method):
#     if transit_method == 'driving':
#         speed = config.AVERAGE_CAR_SPEED
#     elif transit_method == 'transit':
#         speed = config.AVERAGE_TRANSIT_SPEED
#     elif transit_method == 'bicycling':
#         speed = config.AVERAGE_BICYCLING_SPEED
#     else:
#         speed = config.AVERAGE_WALKING_SPEED
#     return speed * (desired_time / 60)

def get_geocode(address):
    prefix = 'https://maps.googleapis.com/maps/api/geocode/json'
    url = urlparse(prefix + '?address=' + address + '&key=' + config.GOOGLE_API_KEY)
    full_url = url.scheme + '://' + url.netloc + url.path + '?' + url.query
    print(full_url)
    req = requests.get(full_url)
    print(req)
    d = req.json()
    print(d)
    return [d['results'][0]['geometry']['location']['lat'], d['results'][0]['geometry']['location']['lng']]


def calculate_radius(address, transit_method, transit_time):
    geocode = get_geocode(address)
    print(geocode)
