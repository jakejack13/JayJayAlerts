#!/bin/sh

docker build ./shared -t jayjaytwitch_shared
docker run jayjaytwitch_shared --entrypoint "npm run lint"
docker build ./src/bot -t jayjaytwitch_bot
docker run jayjaytwitch_bot --entrypoint "npm run lint"
docker build ./src/client -t jayjaytwitch_client
docker run jayjaytwitch_client --entrypoint "npm run lint"
docker build ./src/database -t jayjaytwitch_database
docker run jayjaytwitch_database --entrypoint "pylint app.py lib/**"
docker build ./src/website -t jayjaytwitch_website
docker run jayjaytwitch_website --entrypoint "npm run lint"
