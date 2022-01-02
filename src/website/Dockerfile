FROM jayjayalerts_shared
WORKDIR /src/website
COPY . .
EXPOSE ${ADD_WEBSITEPORT}
RUN npm install
ENTRYPOINT ["npm","start"]
