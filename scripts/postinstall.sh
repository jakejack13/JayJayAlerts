#!/bin/sh

cd lib && npm install
cd ..
cd src
cd bot && npm install
cd ..
cd client && npm install
cd ..
cd database && npm install
cd .. 
cd website && npm install
cd ../..
