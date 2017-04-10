"""
    Manage authentication
"""
from app.models.UserModel import User
from flask import Blueprint
from . import route
from ..extensions import login_manager

bp = Blueprint('user', __name__, url_prefix='/api/user')


@route(bp, '/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    return User.query.get(user_id)


@route(bp, '/<string:email>', methods=['GET'])
def get_user_by_email(email):
    return User.query.get(email)


@route(bp, '/', methods=['POST'])
def create_user():
    return


@route(bp, '/<int:user_id>', methods=['PUT'])
def update_user_by_id(user_id):
    return


@route(bp, '/<string:email>', methods=['PUT'])
def update_user_by_email(email):
    return


@route(bp, '/<int:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    return


@route(bp, '/<string:email>', methods=['DELETE'])
def delete_user_by_email(email):
    return


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
