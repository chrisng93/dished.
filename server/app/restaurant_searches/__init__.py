from ..core import ModelService
from .RestaurantSearchModel import RestaurantSearch


class RestaurantSearchService(ModelService):
    __model__ = RestaurantSearch

    def _preprocess_params(self, kwargs):
        kwargs = super(RestaurantSearchService, self)._preprocess_params(kwargs)
        return {
            'user_location': kwargs['user_location'],
            'transport_method': kwargs['transport_method'],
            'desired_travel_time': kwargs['desired_travel_time'],
            'food_type': kwargs['food_type']
        }
