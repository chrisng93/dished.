from flask import Flask
from .common.helpers import register_blueprints
from .extensions import db, login_manager
from . import config


def create_app(package_name, package_path):
    app = Flask(package_name)

    app.config.from_object(config)

    db.init_app(app)
    login_manager.init_app(app)

    register_blueprints(app, package_name, package_path)

    return app
