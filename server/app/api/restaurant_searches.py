"""
    RestaurantSearch CRUD
"""
from ..services import RestaurantSearch
from flask import Blueprint, jsonify, request, abort
from . import route

bp = Blueprint('restaurant_search', __name__, url_prefix='/api/restaurant/search')


@route(bp, '/<int:id>', methods=['GET'])
def get_search(id):
    return RestaurantSearch.get(id).as_dict()


@route(bp, '/', methods=['POST'])
def create_search():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        abort(400)
    return RestaurantSearch.create(**request.json).as_dict()


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
