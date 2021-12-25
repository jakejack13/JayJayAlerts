//@ts-check

/**
 * The entry point to hosting the client node
 * @author Jacob Kerr
 */

const http = require('http');
const express = require('express');
const path = require('path');

const alschema = require('../../shared/schema/alerts-schema');
const dbschema = require('../../shared/schema/database-schema');
const addresses = require('../../shared/schema/addresses');
const { AlertQueue } = require('./lib/alerts');

/** 
 * The list of channels currently in the database
 * @type {string[]}
 */
var channels = [];

const req = http.request(new URL(dbschema.fieldRequest('channel')), res => {
    res.on('data', d => {
        channels = d.toString().split(',');
        channelCallback();
    });
});
req.on('error', error => {
    console.error(error)
});
req.end();

let channelCallback = () => {

var queues = {};


const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    res.setHeader('Content-Type', 'text/plain');

    let message = "";
    let username = "";
    let channel = "";
    switch(url.pathname) {
        case alschema.CHAT:
            username = url.searchParams.get('username');
            channel = url.searchParams.get('channel');
            message = url.searchParams.get('message');
            message = `${username}: ${message}`;
            res.statusCode = 200;
            res.end('Okay\n');
            break;
        break;
        case alschema.FOLLOW:
            username = url.searchParams.get('username');
            channel = url.searchParams.get('channel');
            message = `${username} just followed!`;
            res.statusCode = 200;
            res.end(`Okay\n`);
            break;
        case alschema.SUBSCRIPTION:
            username = url.searchParams.get('username');
            channel = url.searchParams.get('channel');
            message = `${username} just subscribed!`;
            res.statusCode = 200;
            res.end(`Okay\n`);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Request not found\n');
            return;
    }

    channel = channel.toLowerCase();
    if (queues.hasOwnProperty(channel)) {
        for (let queue of queues[channel]) {
            queue.queueMessage(message);
        }
    }
});

server.listen(addresses.CLIENTBACKPORT, addresses.CLIENTBACKHOSTNAME, () => {
    console.log(`* Server running at http://${addresses.CLIENTBACKHOSTNAME}:${addresses.CLIENTBACKPORT}/`);
});


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));

app.listen(addresses.CLIENTFRONTPORT, addresses.CLIENTFRONTHOSTNAME, () => {
    console.log(`* Website running at http://${addresses.CLIENTFRONTHOSTNAME}:${addresses.CLIENTFRONTPORT}/`);
});


for (let channel of channels) {
    channel = channel.toLowerCase();
    app.get(`/${channel}`, function(req, res) {
        let queue = new AlertQueue(channel, res);
        if (!queues.hasOwnProperty(channel)) {
            queues[channel] = [];
        }
        queues[channel].push(queue);
        res.render('index', {message: ""});
        console.log("Rendered");
    });
}

app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Okay\n');
});

}