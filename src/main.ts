const http = require('http');
const express = require('express');
const path = require('path');
const ex_app = express();

const bot = require('./bot')

ex_app.use(express.json());
ex_app.use(express.static("express"));
// default URL for website
ex_app.use('/', function(req: any,res: any){
    res.sendFile(path.join(__dirname, '../static/index.html'));
  });
const server = http.createServer(ex_app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);