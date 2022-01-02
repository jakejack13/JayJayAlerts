#!/bin/sh

docker build ./shared -t jayjayalerts_shared
VOLUMEMOUNT="$(pwd)/data" docker compose up
