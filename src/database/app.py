from flask import Flask, request

from lib import *
from ...shared.schema import databaseschema as dbschema


app = Flask(__name__)
database = storage.database_factory()


@app.route(dbschema.GET)
def get_request():
    value = database.get_value(
        request.args.get("channel"), request.args.get("field")
    )
    if value is None:
        return "Channel or field not found\n", 406
    return f"{value}\n", 200


@app.route(dbschema.SET)
def set_request():
    value = database.set_value(
        request.args.get("channel"), 
        request.args.get("field"), 
        request.args.get("value")
    )
    if not value:
        return "Field for channel already set or channel not found\n", 406
    return "Done\n", 200


@app.route(dbschema.IS)
def is_request():
    value = database.is_value(
        request.args.get("field"), request.args.get("value")
    )
    return f"{value}\n", 200


@app.route(dbschema.ADD)
def add_request():
    values = [v for v in request.args.values()]
    value = database.add_entry(values)
    if not value:
        return "Channel already added\n", 406
    return "Done\n", 200


@app.route(dbschema.FIELD)
def field_request():
    value = database.get_field(request.args.get("field"))
    if value is None:
        return "Field not found\n", 406
    return f"{''.join(value)}\n", 200

if __name__ == "__main__":
    app.run(host="database",port=3000)