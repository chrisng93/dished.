"""
    Manage authentication
"""
from flask import Blueprint, request, session, g

from ..common.services import User
from ..common.helpers import check_auth
from . import route

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@route(auth_bp, '/login', methods=['POST'])
def login():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        return dict(error='Please include email and password in body'), 400
    user = User.get_by_email(request.json['email'])
    if not user:
        return dict(error='User not found'), 404
    if user.validate_password(request.json['password']):
        try:
            token = user.encode_auth_token()
            response = {
                'user': user.to_dict(),
                'token': token.decode()
            }
            return response
        except Exception as e:
            print(e)
            return dict(error=e)
    return dict(error='Password incorrect'), 401


@route(auth_bp, '/logout', methods=['POST'])
def logout():
    auth = check_auth(request.headers.get('Authorization'))
    if auth['status'] == 'failure':
        # TODO: manage specific errors
        return dict(error=auth['message']), 500
    # TODO: implement token blacklist using redis
    return dict(message='User %d successfully logged out' % auth['message'])
