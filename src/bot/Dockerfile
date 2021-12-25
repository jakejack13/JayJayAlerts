FROM jayjaytwitch_shared
WORKDIR /src/bot
COPY . .
EXPOSE ${ADD_BOTPORT}
RUN npm install
CMD ["npm","start"]
