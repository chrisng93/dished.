"""
    User CRUD
"""
from flask import Blueprint, request
from ..common.services import User, RestaurantSearch
from ..common.helpers import check_auth
from ..common.extensions import redis_store
from .. import config
from . import route

user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@route(user_bp, '/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.get(id)
    if not user:
        return dict(error='User not found'), 404
    return dict(user=user.to_dict())


@route(user_bp, '/<string:email>', methods=['GET'])
def get_user_by_email(email):
    user = User.get(email)
    if not user:
        return dict(error='User not found'), 404
    return dict(user=user.to_dict())


@route(user_bp, '/', methods=['GET'])
def get_users():
    users = User.all()
    return dict(users=[user.to_dict() for user in users])


@route(user_bp, '/', methods=['POST'])
def create_user():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        return dict(error='Please include email and password in body'), 400
    if User.get(request.json['email']):
        return dict(error='User already exists'), 400
    try:
        user = User.create(**request.json)
        token = user.encode_auth_token().decode()
        redis_store.set(token, True)
        redis_store.expire(token, config.TOKEN_EXPIRY)
        return dict(user=user.to_dict(), token=token)
    except Exception as e:
        print('error', str(e))
        return dict(error=str(e)), 500


@route(user_bp, '/<int:id>', methods=['PUT'])
def update_user(id):
    if not request.json:
        return dict(error='Please include updated fields and values'), 400
    request.json['id'] = id
    user = User.get(id)
    if not user:
        return dict(error='User not found'), 404
    try:
        auth = check_auth(request.headers.get('Authorization'))
        if auth['status'] == 'failure':
            return dict(error=auth['message']), 401
        if auth['message'] != id:
            return dict(error='Permission denied'), 401
        return dict(user=User.update(**request.json).to_dict())
    except Exception as e:
        return dict(error=str(e)), 500


@route(user_bp, '/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.get(id)
    if not user:
        return dict(error='User not found'), 404
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'failure':
        return dict(error=auth['message']), 401
    if auth['message'] != id:
        return dict(error='Permission denied'), 401
    User.delete(id)
    return dict(message='User %d successfully deleted' % id)


@route(user_bp, '/searches', methods=['GET'])
def get_searches():
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'failure':
        return dict(error=auth['message']), 401
    searches = RestaurantSearch.get_user_searches(auth['message'])
    return dict(searches=[search.to_dict() for search in searches])
