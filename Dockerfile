FROM debian:latest
RUN apt update && \
    apt install -y nodejs npm
EXPOSE 3000
WORKDIR /
COPY . .
RUN npm install
ENTRYPOINT [ "npm", "start" ]
