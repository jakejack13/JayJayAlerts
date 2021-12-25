FROM jayjaytwitch_shared
WORKDIR /src/website
COPY . .
EXPOSE ${ADD_WEBSITEPORT}
RUN npm install
CMD ["npm","start"]
