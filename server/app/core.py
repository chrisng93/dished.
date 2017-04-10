from flask import Flask
from .common.helpers import register_blueprints
from .extensions import db, login_manager
from . import config


def create_app(package_name, package_path):
    app = Flask(package_name)

    app.config.from_object(config)

    db.init_app(app)
    login_manager.init_app(app)

    with app.app_context():
        db.create_all()
        from .users.UserModel import User
        from .restaurant_searches.RestaurantSearchModel import RestaurantSearch

    register_blueprints(app, package_name, package_path)

    return app


class ModelService(object):
    """ Creates ModelService class that allows for easy manipulation of SQLAlchemy objects """
    __model__ = None

    def _preprocess_params(self, kwargs):
        """ Return fields relevant to given model """
        return kwargs

    def _isinstance(self, model):
        """ Checks to see if model is correct instance """
        if not isinstance(model, self.__model__):
            raise ValueError('%s is not of type %s' % (model, self.__model__))
        return True

    def save(self, model):
        """ Saves and returns model """
        self._isinstance(model)
        db.session.add(model)
        db.session.commit()
        return model

    def create(self, **kwargs):
        """ Creates and returns model """
        model = self.__model__(**self._preprocess_params(kwargs))
        return self.save(model)

    def all(self):
        """ Gets all instances of a model """
        return self.__model__.query.all()

    def get(self, id):
        """ Gets model """
        return self.__model__.query.get(id)

    def update(self, **kwargs):
        """ Updates and returns model """
        model = self.get(kwargs['id'])
        for k, v in self._preprocess_params(kwargs).items():
            setattr(model, k, v)
        return self.save(model)

    def delete(self, model):
        """ Deletes model """
        self._isinstance(model)
        db.session.delete(model)
        db.session.commit()
