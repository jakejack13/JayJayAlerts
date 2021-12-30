"""The entry point for the database node

@author Jacob Kerr"""

import os
import json
from flask import Flask, request

# pylint: disable=import-error
from lib.storage import Database, database_factory
# pylint: disable=import-error
from lib.schema import GET, SET, IS, ADD, FIELD, ENTRY


app = Flask(__name__)
database: Database = None


@app.before_first_request
def load_database():
    """Loads database before requests are processed"""
    # pylint: disable=global-statement
    # pylint: disable=invalid-name
    global database
    if database is None:
        database = database_factory()


@app.route(GET)
def get_request():
    """Get the value for a channel from the specific field"""
    value = database.get_value(
        request.args.get("channel"), request.args.get("field")
    )
    if value is None:
        return "Channel or field not found", 406
    return f"{value}", 200


@app.route(SET)
def set_request():
    """Set the value for a channel from the specific field"""
    value = database.set_value(
        request.args.get("channel"),
        request.args.get("field"),
        request.args.get("value")
    )
    if not value:
        return "Field for channel already set or channel not found", 406
    return "Done", 200


@app.route(IS)
def is_request():
    """Check if the value for a channel from a specific field is the given
    value"""
    value = database.is_value(
        request.args.get("field"), request.args.get("value")
    )
    return f"{value}", 200


@app.route(ADD)
def add_request():
    """Adds an entry to the database"""
    values = list(request.args.values())
    value = database.add_entry(values)
    if not value:
        return "Channel already added", 406
    return "Done", 200


@app.route(FIELD)
def field_request():
    """Returns all of the values from the given field"""
    value = database.get_field(request.args.get("field"))
    if value is None:
        return "Field not found", 406
    return f"{','.join(value)}", 200


@app.route(ENTRY)
def entry_request():
    """Returns all of the values from the given entry"""
    value = database.get_entry(request.args.get("channel"))
    if value is None:
        return "Field not found", 406
    return json.dumps(value), 200


if __name__ == "__main__":
    app.run(
        host=os.environ.get("ADD_DATABASEHOSTNAME") or "localhost",
        port=int(os.environ.get("ADD_DATABASEPORT") or 8000)
    )
