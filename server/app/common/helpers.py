"""
    Define helpers
"""
import pkgutil
import importlib
import jwt
from flask import Blueprint
from .. import config
from ..common.extensions import redis


def register_blueprints(app, package_name, package_path):
    """ Registers all Blueprint instances """
    rv = []
    for _, name, _ in pkgutil.iter_modules(package_path):
        m = importlib.import_module('%s.%s' % (package_name, name))
        for item in dir(m):
            item = getattr(m, item)
            if isinstance(item, Blueprint):
                app.register_blueprint(item)
            rv.append(item)
    return rv


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, config.SECRET_KEY)
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature has expired'
    except jwt.InvalidTokenError:
        return 'Invalid token'


def check_auth(auth_header):
    if not auth_header:
        return dict(status='failure', message='Permission denied. Please include authorization header.')
    token = auth_header.split(' ')[1]
    if redis.get(token).decode('utf-8') == 'False':
        return dict(status='failure', message='Invalid token')
    try:
        resp = decode_auth_token(token)
        status = 'failure' if isinstance(resp, str) else 'success'
        return dict(status=status, message=resp)
    except Exception as e:
        return dict(status='failure', message=str(e))
