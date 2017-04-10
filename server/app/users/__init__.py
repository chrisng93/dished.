from ..core import ModelService
from .UserModel import User


class UserService(ModelService):
    __model__ = User
