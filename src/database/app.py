"""The entry point for the database node

@author Jacob Kerr"""

from flask import Flask, request
import sys

from lib import *


app = Flask(__name__)
database: Database = None

@app.before_first_request
def load_database():
    global database
    if database is None:
        database = storage.database_factory()

@app.route(schema.GET)
def get_request():
    value = database.get_value(
        request.args.get("channel"), request.args.get("field")
    )
    if value is None:
        return "Channel or field not found", 406
    return f"{value}", 200


@app.route(schema.SET)
def set_request():
    value = database.set_value(
        request.args.get("channel"), 
        request.args.get("field"), 
        request.args.get("value")
    )
    if not value:
        return "Field for channel already set or channel not found", 406
    return "Done", 200


@app.route(schema.IS)
def is_request():
    value = database.is_value(
        request.args.get("field"), request.args.get("value")
    )
    return f"{value}", 200


@app.route(schema.ADD)
def add_request():
    values = [v for v in request.args.values()]
    value = database.add_entry(values)
    if not value:
        return "Channel already added", 406
    return "Done", 200


@app.route(schema.FIELD)
def field_request():
    value = database.get_field(request.args.get("field"))
    if value is None:
        return "Field not found", 406
    return f"{','.join(value)}", 200

if __name__ == "__main__":
    app.run(
        host=os.environ.get("ADD_DATABASEHOSTNAME"),
        port=int(os.environ.get("ADD_DATABASEPORT"))
    )
