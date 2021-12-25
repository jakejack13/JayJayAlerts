FROM jayjaytwitch_shared
WORKDIR /src
COPY . .
EXPOSE ${ADD_DATABASEPORT}
RUN python3 -m pip install -r requirements.txt
CMD python3 -m flask run -h ${ADD_DATABASEHOSTNAME} -p ${ADD_DATABASEPORT}
