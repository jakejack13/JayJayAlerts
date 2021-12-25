#!/bin/sh

docker build ./shared -t jayjaytwitch_shared
VOLUMEMOUNT="$(pwd)/data" docker compose up
