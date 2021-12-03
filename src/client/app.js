//@ts-check

/**
 * The entry point to hosting the client node
 * @author Jacob Kerr
 */

const http = require('http');
const express = require('express');
const path = require('path');

const alschema = require('../../lib/schema/alerts-schema');
const addresses = require('../../lib/schema/addresses');


const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    res.setHeader('Content-Type', 'text/plain');

    let message = undefined;
    switch(url.pathname) {
        case alschema.FOLLOW:
            message = `${url.searchParams.get('username')} just followed!`;
            res.statusCode = 200;
            res.end(`Okay\n`);
            break;
        case alschema.SUBSCRIPTION:
            message = `${url.searchParams.get('username')} just subscribed!`;
            res.statusCode = 200;
            res.end(`Okay\n`);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Request not found\n');
    }
});

server.listen(addresses.CLIENTBACKPORT, addresses.HOSTNAME, () => {
    console.log(`* Server running at http://${addresses.HOSTNAME}:${addresses.CLIENTBACKPORT}/`);
});


const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    
});
