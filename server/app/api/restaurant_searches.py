"""
    RestaurantSearch CRUD
"""
from functools import reduce
from ..services import RestaurantSearch
from flask import Blueprint, jsonify, request, abort
from . import route

bp = Blueprint('restaurant_search', __name__, url_prefix='/api/restaurant/search')


@route(bp, '/<int:id>', methods=['GET'])
def get_search(id):
    return RestaurantSearch.get(id).as_dict()


@route(bp, '/', methods=['POST'])
def create_search():
    req_fields = ['user_location', 'transport_method', 'desired_travel_time', 'food_type']
    given_fields = list(request.json.keys())
    has_all_fields = reduce((lambda x, y: x and y), [field in req_fields for field in given_fields])
    if not request.json or not has_all_fields or len(given_fields) != len(req_fields):
        abort(400)
    rs = RestaurantSearch.create(**request.json).as_dict()
    # hit google maps api to get radius given user_location, transport_method, and desired_travel_time
    # hit yelp api to get restaurants w/ certain food_type within given radius of user_location
    return


@route(bp, '/<int:id>', methods=['PUT'])
def update_search(id):
    if not request.json:
        abort(400)
    request.json['id'] = id
    return RestaurantSearch.update(**request.json).as_dict()


@route(bp, '/<int:id>', methods=['DELETE'])
def delete_search(id):
    if not id:
        abort(400)
    return RestaurantSearch.delete(id)
