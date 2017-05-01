"""
    Manage authentication
"""
from flask import Blueprint, request
from ..common.services import User
from ..common.helpers import check_auth
from ..common.extensions import redis
from .. import config
from . import route


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@route(auth_bp, '/signin', methods=['POST'])
def signin():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        return dict(error='Please include email and password in body'), 400
    user = User.get_by_email(request.json['email'])
    if not user:
        return dict(error='User not found'), 404
    if user.validate_password(request.json['password']):
        try:
            token = user.encode_auth_token().decode()
            redis.set(token, True)
            redis.expire(token, config.TOKEN_EXPIRY)
            return dict(user=user.to_dict(), token=token)
        except Exception as e:
            return dict(error=str(e)), 500
    return dict(error='Password incorrect'), 401


@route(auth_bp, '/signout', methods=['POST'])
def signout():
    auth_header = request.headers.get('Authorization')
    auth = check_auth(auth_header)
    if auth['status'] == 'failure':
        return dict(error=auth['message']), 500
    token = auth_header.split(' ')[1]
    redis.set(token, False)
    return dict(message='User %d successfully logged out' % auth['message'])
