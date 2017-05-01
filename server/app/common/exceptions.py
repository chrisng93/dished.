"""
    Define custom exceptions
"""


class InvalidField(Exception):
    def __init__(self, message='', errors={}):
        super(InvalidField, self).__init__(message)
        self.errors = errors


class TakingTooLong(Exception):
    def __init__(self, message='', errors={}):
        super(TakingTooLong, self).__init__(message)
        self.errors = errors


class UnableToComplete(Exception):
    def __init__(self, message='', errors={}):
        super(UnableToComplete, self).__init__(message)
        self.errors = errors


class GoogleMapsError(Exception):
    def __init__(self, message='', errors={}):
        super(GoogleMapsError, self).__init__(message)
        self.errors = errors
