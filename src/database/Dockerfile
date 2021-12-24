FROM jayjaytwitch_shared
WORKDIR /src
COPY . .
EXPOSE 8000
RUN python3 -m pip install -r requirements.txt
CMD ["python3","-m","flask","run","-h","database","-p","8000"]
