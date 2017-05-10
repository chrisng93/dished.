"""
    Customizations for restaurant search service
"""
from ..common.core import ModelService
from .RestaurantSearchModel import RestaurantSearch
from ..users.UserModel import User


class RestaurantSearchService(ModelService):
    __model__ = RestaurantSearch

    def get_user_searches(self, user_id):
        return self.__model__.query.join(User, User.id==RestaurantSearch.user_id).filter_by(id=user_id).all()
