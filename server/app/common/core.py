from flask import Flask
from flask_cors import CORS
from .. import config
from .extensions import db, redis
from .helpers import register_blueprints


def create_app(package_name, package_path):
    app = Flask(package_name)
    CORS(app)

    app.config.from_object(config)
    app.secret_key = config.SECRET_KEY

    db.init_app(app)
    redis.init_app(app)

    from ..restaurant_searches.api_helpers import get_yelp_access_token
    get_yelp_access_token()

    register_blueprints(app, package_name, package_path)

    return app


class ModelService(object):
    """ Creates ModelService class that allows for easy manipulation of SQLAlchemy objects """
    __model__ = None

    def _preprocess_params(self, kwargs):
        fields = self.__model__.__table__.columns._data.keys()
        return {k: v for k, v in kwargs.items() if k in fields and k is not 'id'}

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
        self.save(model)
        return model

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
        self.save(model)
        return model

    def delete(self, id):
        """ Deletes model """
        model = self.get(id)
        self._isinstance(model)
        db.session.delete(model)
        db.session.commit()
