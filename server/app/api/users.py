"""
    User CRUD
"""
from ..services import User
from flask import Blueprint, jsonify, request, abort
from . import route

bp = Blueprint('user', __name__, url_prefix='/api/user')


@route(bp, '/<int:id>', methods=['GET'])
def get_user_by_id(id):
    return User.get(id).as_dict()


@route(bp, '/<string:email>', methods=['GET'])
def get_user_by_email(email):
    return User.get(email).as_dict()


@route(bp, '/', methods=['POST'])
def create_user():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        abort(400)
    return User.create(**request.json).as_dict()


@route(bp, '/<int:id>', methods=['PUT'])
def update_user(id):
    if not request.json:
        abort(400)
    request.json['id'] = id
    return User.update(**request.json).as_dict()


@route(bp, '/<int:id>', methods=['DELETE'])
def delete_user(id):
    if not id:
        abort(400)
    return User.delete(id)


# @login_manager.user_loader
# def load_user(id):
#     return User.query.get(int(id))
