#!/bin/sh

docker compose rm -f -s -v
docker image rm jayjaytwitch_lib
docker image rm jayjaytwitch_bot
docker image rm jayjaytwitch_client
docker image rm jayjaytwitch_database
