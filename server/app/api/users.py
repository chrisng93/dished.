"""
    User CRUD
"""
from flask import Blueprint, request, abort, g
from flask_login import login_required
from ..common.services import User
from . import route

bp = Blueprint('user', __name__, url_prefix='/api/user')


@route(bp, '/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.get(id)
    if not user:
        abort(404)
    return user.as_dict()


@route(bp, '/<string:email>', methods=['GET'])
def get_user_by_email(email):
    user = User.get(email)
    if not user:
        abort(404)
    return user.as_dict()


@route(bp, '/', methods=['POST'])
def create_user():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        abort(400)
    return User.create(**request.json).as_dict()


@route(bp, '/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    if not request.json:
        abort(400)
    request.json['id'] = id
    if not User.get(id):
        abort(404)
    if 'user' in g and g.user and g.user.is_authenticated and g.user.get_id() != id:
        abort(401)
    return User.update(**request.json).as_dict()


@route(bp, '/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    if not id:
        abort(400)
    if not User.get(id):
        abort(404)
    if 'user' in g and g.user and g.user.is_authenticated and g.user.get_id() != id:
        abort(401)
    return User.delete(id)
