"""
    Manage authentication
"""
from flask import Blueprint, request, abort, session, g
from flask_login import login_user, logout_user, login_required

from ..common.extensions import login_manager
from ..common.services import User
from . import route

bp = Blueprint('auth', __name__, url_prefix='/auth')


@route(bp, '/login', methods=['POST'])
def login():
    user = User.get(request.json['id'])
    if not user:
        abort(404)
    if 'user' in g and g.user is not None and g.user.is_authenticated:
        return True
    print('validating', g)
    if user.validate_password(request.json['password']):
        login_user(user, remember=True, fresh=True)
        session['remember_me'] = getattr(user, 'id')
        return 'Login successful'
    abort(401)


@route(bp, '/logout', methods=['POST'])
@login_required
def logout():
    user = User.get(request.json['id'])
    if not user:
        abort(404)
    logout_user()


@login_manager.user_loader
def load_user(id):
    return User.get(int(id))
