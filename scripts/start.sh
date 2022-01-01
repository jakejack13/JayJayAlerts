#!/bin/sh

docker build ./shared -t jayjayalerts_shared
docker compose up
