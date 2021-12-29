FROM jayjaytwitch_shared
WORKDIR /src/client
COPY . .
EXPOSE ${ADD_CLIENTBACKPORT}
EXPOSE ${ADD_CLIENTFRONTPORT}
RUN npm install
ENTRYPOINT ["npm","start"]
