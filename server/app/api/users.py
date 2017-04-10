"""
    Manage authentication
"""
from ..services import User
from flask import Blueprint, jsonify, request, abort
from . import route
from ..extensions import db

bp = Blueprint('user', __name__, url_prefix='/api/user')


@route(bp, '/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    return User.get(user_id).as_dict()


@route(bp, '/<string:email>', methods=['GET'])
def get_user_by_email(email):
    return User.get(email).as_dict()


@route(bp, '/', methods=['POST'])
def create_user():
    if not request.json or 'email' not in request.json or 'password' not in request.json:
        abort(400)
    user = User.create(**request.json)
    db.session.add(user)
    db.session.commit()
    return jsonify(user)


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


# @login_manager.user_loader
# def load_user(id):
#     return User.query.get(int(id))
