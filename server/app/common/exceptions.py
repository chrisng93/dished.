"""
    Define custom exceptions
"""


class InvalidField(Exception):
    def __init__(self, message='', errors={}):
        super(InvalidField, self).__init__(message)
        self.errors = errors
