FROM debian:latest
RUN apt update && \
    apt install -y python3 python3-pip nodejs npm
RUN mkdir /data
WORKDIR /shared
COPY . .
RUN npm install
