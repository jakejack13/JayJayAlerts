FROM debian:latest
RUN apt update && \
    apt install -y nodejs npm
WORKDIR /
COPY . .
RUN npm install
ENTRYPOINT [ "npm", "start" ]
