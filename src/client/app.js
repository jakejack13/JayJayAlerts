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
const { hostname } = require('os');

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


/**
 * The lists of requests for each channel name
 */
var results = {};

/**
 * The next message for each channel name
 */
var messages = {};

const backServer = http.createServer((req, res) => {
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
});

backServer.listen(addresses.CLIENTBACKPORT, addresses.CLIENTBACKHOSTNAME, () => {
    console.log(`* Server running at http://${addresses.CLIENTBACKHOSTNAME}:${addresses.CLIENTBACKPORT}/`);
});


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use('/views', express.static('views'));


for (let channel of channels) {
    channel = channel.toLowerCase();
    app.get(`/${channel}`, function(req, res) {
        res.render('index', {channel: channel});
    });
}

app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Okay\n');
});

const frontServer = http.createServer(app);
const socketio = require('socket.io');
/** @type {socketio.Server} */
//@ts-ignore
const io = socketio(frontServer);

io.on("connection", function(socket) {
    console.log("Socket connected");
    socket.emit('client connected');

    socket.on('channel sent', function(channel) {
        console.log(channel);
    });
});

frontServer.listen(addresses.CLIENTFRONTPORT, addresses.CLIENTFRONTHOSTNAME, () => {
    console.log(`* Website running at http://${addresses.CLIENTFRONTHOSTNAME}:${addresses.CLIENTFRONTPORT}/`);
});

}