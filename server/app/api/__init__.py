"""
    API core
"""
from functools import wraps
from flask import jsonify

from .. import core

def create_app():
    """ Returns API application instance """

    app = core.create_app(__name__, __path__)

    # Custom error handlers
    # app.errorhandler(ExampleError)(on_example_error)
    app.errorhandler(404)(on_404)

    return app


def route(bp, *args, **kwargs):
    kwargs.setdefault('strict_slashes', False)

    def decorator(f):
        @bp.route(*args, **kwargs)
        @wraps(f)
        def wrapper(*args, **kwargs):
            sc = 200
            rv = f(*args, **kwargs)
            if isinstance(rv, tuple):
                sc = rv[1]
                rv = rv[0]
            return jsonify(dict(data=rv)), sc
        return f
    return decorator


def on_404(e):
    return jsonify(dict(error='Not found')), 404
