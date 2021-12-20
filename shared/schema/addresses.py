import os

from dotenv import load_dotenv
load_dotenv(dotenv_path="./addresses.env")

DATABASEHOSTNAME = os.environ.get("DATABASEHOSTNAME")
"""The hostname for the database node"""

BOTHOSTNAME = os.environ.get("BOTHOSTNAME")
"""The hostname for the bot node"""

CLIENTFRONTHOSTNAME = os.environ.get("CLIENTFRONTHOSTNAME")
"""The hostname for the forward facing client node"""

CLIENTBACKHOSTNAME = os.environ.get("CLIENTBACKHOSTNAME")
"""The hostname for the backwards facing client node"""

WEBSITEHOSTNAME = os.environ.get("WEBSITEHOSTNAME")
"""The hostname for the website node"""

DATABASEPORT = int(os.environ.get("DATABASEPORT"))
"""The port for the database node"""

BOTPORT = int(os.environ.get("BOTPORT"))
"""The port for the bot node"""

CLIENTBACKPORT = int(os.environ.get("CLIENTBACKPORT"))
"""The port for the client node backend"""

CLIENTFRONTPORT = int(os.environ.get("CLIENTFRONTPORT"))
"""The port for the client node frontend"""

WEBSITEPORT = int(os.environ.get("WEBSITEPORT"))
"""The port for the website node"""