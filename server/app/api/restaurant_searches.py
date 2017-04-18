"""
    RestaurantSearch CRUD
"""
from functools import reduce
from flask import Blueprint, request, g
from ..common.services import RestaurantSearch
from ..common.exceptions import UnableToComplete
from ..common.helpers import check_auth
from . import route
from ..restaurant_searches.helpers import get_radius

restaurant_search_bp = Blueprint('restaurant_search', __name__, url_prefix='/api/restaurant/search')


@route(restaurant_search_bp, '/<int:id>', methods=['GET'])
def get_search(id):
    return dict(search=RestaurantSearch.get(id).to_dict())


@route(restaurant_search_bp, '/', methods=['POST'])
def create_search():
    req_fields = ['user_location', 'transport_method', 'desired_travel_time', 'food_type']
    given_fields = list(request.json.keys())
    has_all_fields = reduce((lambda x, y: x and y), [field in req_fields for field in given_fields])
    if not request.json or not has_all_fields or len(given_fields) != len(req_fields):
        return dict(error='Please supply all necessary fields: user_location, transport_method,'
                          'desired travel_time, and food_type'), 400
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'success':
        request.json['user_id'] = auth['message']
    rs = RestaurantSearch.create(**request.json).to_dict()
    try:
        # TODO: optimize this so that we don't have to wait long
        radius = get_radius(37.1, -122.3, 1, 'walking')
        # hit yelp api to get restaurants w/ certain food_type within given radius of user_location
        # run results through ranking algorithm and return to client
    except UnableToComplete as e:
        return dict(error=str(e))
    return


@route(restaurant_search_bp, '/<int:id>', methods=['PUT'])
def update_search(id):
    if not request.json:
        return dict(error='Please send updated fields and values'), 400
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'failure':
        return dict(error=auth['message']), 401
    if auth['message'] != id:
        return dict(error='Permission denied'), 401
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
