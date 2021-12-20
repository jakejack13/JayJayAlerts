import os

from dotenv import load_dotenv
load_dotenv(dotenv_path="./addresses.env")

DATABASEHOSTNAME = os.environ.get("DATABASEHOSTNAME")

BOTHOSTNAME = os.environ.get("BOTHOSTNAME")

CLIENTFRONTHOSTNAME = os.environ.get("CLIENTFRONTHOSTNAME")

CLIENTBACKHOSTNAME = os.environ.get("CLIENTBACKHOSTNAME")

WEBSITEHOSTNAME = os.environ.get("WEBSITEHOSTNAME")

DATABASEPORT = int(os.environ.get("DATABASEPORT"))

BOTPORT = int(os.environ.get("BOTPORT"))

CLIENTBACKPORT = int(os.environ.get("CLIENTBACKPORT"))

CLIENTFRONTPORT = int(os.environ.get("CLIENTFRONTPORT"))

WEBSITEPORT = int(os.environ.get("WEBSITEPORT"))