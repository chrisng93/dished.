"""
    Define custom exceptions
"""
from flask import jsonify


class InvalidField(Exception):
    def __init__(self, message='', errors={}):
        super(InvalidField, self).__init__(message)
        self.errors = errors


############################ EXAMPLE ############################
# class InvalidUsage(Exception):
#     status_code = 400
#
#     def __init__(self, message, status_code=None, payload=None):
#         Exception.__init__(self)
#         self.message = message
#         if status_code is not None:
#             self.status_code = status_code
#         self.payload = payload
#
#     def to_dict(self):
#         rv = dict(self.payload or ())
#         rv['message'] = self.message
#         return rv
#################################################################
