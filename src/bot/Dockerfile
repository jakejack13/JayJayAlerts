FROM jayjayalerts_shared
WORKDIR /src/bot
COPY . .
EXPOSE ${ADD_BOTPORT}
RUN npm install
ENTRYPOINT ["npm","start"]
