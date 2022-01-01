"""Module used to get database schema environment variables

@author Jacob Kerr"""

import os


FIELDS = (os.environ.get("DB_FIELDS") or "none").split(",")

GET = os.environ.get("DB_GET") or "/get"
"""The request path for a GET request"""

SET = os.environ.get("DB_SET") or "/set"
"""The request path for a SET request"""

IS = os.environ.get("DB_IS") or "/is"
"""The request path for an IS request"""

ADD = os.environ.get("DB_ADD") or "/add"
"""The request path for an ADD request"""

FIELD = os.environ.get("DB_FIELD") or "/field"
"""The request path for a FIELD request"""

ENTRY = os.environ.get("DB_ENTRY") or "/entry"
"""The request path for an ENTRY request"""
