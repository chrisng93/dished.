"""
    Define helpers
"""
import pkgutil
import importlib
from flask import Blueprint


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
