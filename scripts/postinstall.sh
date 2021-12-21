#!/bin/sh

cd shared && npm install
cd ..
cd src
cd bot && npm install
cd ..
cd client && npm install
cd ..
cd database && python3 -m pip install -r requirements.txt
cd .. 
cd website && npm install
cd ../..
