"""Module used to get database schema environment variables

@author Jacob Kerr"""

import os


FIELDS = os.environ.get("DB_FIELDS").split(",")

GET = os.environ.get("DB_GET")
"""The request path for a GET request"""

SET = os.environ.get("DB_SET")
"""The request path for a SET request"""

IS = os.environ.get("DB_IS")
"""The request path for an IS request"""

ADD = os.environ.get("DB_ADD")
"""The request path for an ADD request"""

FIELD = os.environ.get("DB_FIELD")
"""The request path for a FIELD request"""
