#!/bin/sh

docker compose rm -f -s -v
docker image rm jayjayalerts_shared
docker image rm jayjayalerts_bot
docker image rm jayjayalerts_client
docker image rm jayjayalerts_database
docker image rm jayjayalerts_website
