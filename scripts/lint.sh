#!/bin/sh

docker build ./shared -t jayjayalerts_shared
docker run jayjayalerts_shared --entrypoint "npm run lint"
docker build ./src/bot -t jayjayalerts_bot
docker run jayjayalerts_bot --entrypoint "npm run lint"
docker build ./src/client -t jayjayalerts_client
docker run jayjayalerts_client --entrypoint "npm run lint"
docker build ./src/database -t jayjayalerts_database
docker run jayjayalerts_database --entrypoint "pylint app.py lib/**"
docker build ./src/website -t jayjayalerts_website
docker run jayjayalerts_website --entrypoint "npm run lint"
