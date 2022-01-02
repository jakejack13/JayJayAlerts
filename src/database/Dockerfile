FROM jayjayalerts_shared
WORKDIR /src/database
COPY . .
EXPOSE ${ADD_DATABASEPORT}
RUN python3 -m pip install -r requirements.txt
ENTRYPOINT python3 -m flask run -h ${ADD_DATABASEHOSTNAME} -p ${ADD_DATABASEPORT}
