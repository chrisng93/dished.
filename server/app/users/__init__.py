from ..common.core import ModelService
from .UserModel import User


class UserService(ModelService):
    __model__ = User

    def get_by_email(self, email):
        return self.__model__.query.filter_by(email=email).first()
