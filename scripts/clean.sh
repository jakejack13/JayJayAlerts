#!/bin/sh

VOLUMEMOUNT="$(pwd)/data" docker compose rm -f -s -v
docker image rm jayjaytwitch_shared
docker image rm jayjaytwitch_bot
docker image rm jayjaytwitch_client
docker image rm jayjaytwitch_database
docker image rm jayjaytwitch_website
