from ..core import ModelService
from .UserModel import User


class UserService(ModelService):
    __model__ = User

    def _preprocess_params(self, kwargs):
        kwargs = super(UserService, self)._preprocess_params(kwargs)
        return {'email': kwargs['email'], 'password': kwargs['password']}
