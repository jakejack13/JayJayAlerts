FROM jayjaytwitch_shared
WORKDIR /src
COPY . .
EXPOSE ${ADD_CLIENTBACKPORT}
EXPOSE ${ADD_CLIENTFRONTPORT}
RUN npm install
CMD ["npm","start"]
