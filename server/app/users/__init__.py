"""
    Customizations for user service
"""
from ..common.core import ModelService
from .UserModel import User


class UserService(ModelService):
    __model__ = User

    def update(self, **kwargs):
        """ Updates and returns model """
        model = self.get(kwargs['id'])
        for k, v in self._preprocess_params(kwargs).items():
            if k == 'password':
                model.set_password(v)
            else:
                setattr(model, k, v)
        self.save(model)
        return model

    def get_by_email(self, email):
        return self.__model__.query.filter_by(email=email).first()
