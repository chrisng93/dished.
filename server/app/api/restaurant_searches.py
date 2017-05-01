"""
    RestaurantSearch CRUD
"""
from functools import reduce
from flask import Blueprint, request, g
from ..common.services import RestaurantSearch
from ..common.exceptions import TakingTooLong, GoogleMapsError
from ..common.helpers import check_auth
from . import route
from ..restaurant_searches.location_helpers import calculate_radius, get_geocode
from ..restaurant_searches.api_helpers import hit_yelp
from ..restaurant_searches.rank_restaurants import rank_restaurants

restaurant_search_bp = Blueprint('restaurant_search', __name__, url_prefix='/api/restaurant/search')


@route(restaurant_search_bp, '/<int:id>', methods=['GET'])
def get_search(id):
    return dict(search=RestaurantSearch.get(id).to_dict())


@route(restaurant_search_bp, '/radius', methods=['GET'])
def get_radius():
    address = request.args.get('address')
    transit_method = request.args.get('transit_method')
    transit_time = request.args.get('transit_time')
    if not address or not transit_method or not transit_time:
        return dict(error='Please supply all necessary fields: address, transit_method, and transit_time'), 400
    return calculate_radius(address, transit_method, transit_time)


@route(restaurant_search_bp, '/', methods=['POST'])
def create_search():
    try:
        req_fields = ['user_location', 'radius', 'food_type', 'transit_method', 'transit_time']
        given_fields = list(request.json.keys())
        has_all_fields = reduce((lambda x, y: x and y), [field in req_fields for field in given_fields])
        if not request.json or not has_all_fields or len(given_fields) != len(req_fields):
            return dict(error='Please supply all necessary fields: user_location, radius, food_type, transit_method,'
                              ' and transit_time'), 400
        auth = check_auth(request.headers.get('Authorization'))
        if auth['status'] == 'success':
            request.json['user_id'] = auth['message']
        rs = RestaurantSearch.create(**request.json).to_dict()
        geocode = get_geocode(request.json['user_location'])
        restaurants = hit_yelp(location=geocode, radius=request.json['radius'], food=request.json['food_type'],
                               transit_time=request.json['transit_time'])
        if len(restaurants) == 0:
            return dict(error='Not enough results'), 500
        restaurant_rankings = rank_restaurants(restaurants)[0:20]
        return dict(restaurants=restaurant_rankings, id=rs['id'])
    except TakingTooLong as e:
        return dict(error='Request taking too long'), 500
    except GoogleMapsError as e:
        return dict(error='Error getting data from Google Maps API'), 500
    except Exception as e:
        return dict(error=str(e)), 500


@route(restaurant_search_bp, '/<int:id>', methods=['PUT'])
def update_search(id):
    if not request.json:
        return dict(error='Please send updated fields and values'), 400
    request.json['id'] = id
    if request.json['choice']:
        request.json['selection'] = request.json['choice']['name']
    return dict(search=RestaurantSearch.update(**request.json).to_dict())


@route(restaurant_search_bp, '/<int:id>', methods=['DELETE'])
def delete_search(id):
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'failure':
        return dict(error=auth['message']), 401
    if auth['message'] != id:
        return dict(error='Permission denied'), 401
    RestaurantSearch.delete(id)
    return dict(message='Restaurant Search %d successfully deleted' % id)
