"""
    API core
"""
from functools import wraps
from flask import jsonify

from ..common import core

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
            code = 200
            data = f(*args, **kwargs)
            if isinstance(data, tuple):
                code = data[1]
                data = data[0]
            data['status'] = 'success' if str(code)[0] == '2' else 'failure'
            return jsonify(**data), code
        return f
    return decorator


def on_404(e):
    return jsonify(dict(error='Not found')), 404
