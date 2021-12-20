import os

from dotenv import load_dotenv
load_dotenv(dotenv_path="./database-schema.env")


FIELDS = os.environ.get("FIELDS").split(",")
"""The fields stored in the database"""

GET = os.environ.get("GET")
"""The request path for a getValue request"""

SET = os.environ.get("SET")
"""The request path for a setValue request"""

IS = os.environ.get("IS")
"""The request path for an isValue request"""

ADD = os.environ.get("ADD")
"""The request path for an addEntry request"""

FIELD = os.environ.get("FIELD")
"""The request path for a getField request"""
