// @ts-check

/**
 * The entry point to hosting the client node
 * @author Jacob Kerr
 */

/** */
const http = require('http');
const express = require('express');
const path = require('path');

const alschema = require('../shared/schema/alerts-schema');
const dbschema = require('../shared/schema/database-schema');
const addresses = require('../shared/schema/addresses');
const socketio = require('socket.io');

const app = express();
const frontServer = http.createServer(app);
/** @type {socketio.Server} */
// @ts-ignore
const io = socketio(frontServer);

/**
 * The list of channels currently in the database
 * @type {string[]}
 */
let channels = [];

const req = http.request(new URL(dbschema.fieldRequest('channel')), (res) => {
    res.on('data', (d) => {
        channels = d.toString().split(',');
        channelCallback();
    });
});
req.on('error', (error) => {
    console.error(error);
});
req.end();

const channelCallback = () => {
    /**
     * The list of sockets
     */
    const sockets = {};

    const backServer = http.createServer((req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        res.setHeader('Content-Type', 'text/plain');

        let channel = '';
        let message = '';
        switch (url.pathname) {
        case alschema.MESSAGE:
            channel = url.searchParams.get('channel');
            message = url.searchParams.get('message');
            res.statusCode = 200;
            res.end('Okay\n');
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Request not found\n');
            return;
        }

        channel = channel.toLowerCase();
        if (sockets.hasOwnProperty(channel)) {
            for (const socket of sockets[channel]) {
                socket.emit('message', message);
            }
        }
    });

    backServer.listen(
        addresses.CLIENTBACKPORT, addresses.CLIENTBACKHOSTNAME, () => {
            console.log(`* Server running at http://${addresses.CLIENTBACKHOSTNAME}:${addresses.CLIENTBACKPORT}/`);
        },
    );

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


    io.on('connection', function(socket) {
        socket.emit('client connected');

        socket.on('channel sent', function(channel) {
            if (!sockets.hasOwnProperty(channel)) {
                sockets[channel] = [];
            }
            sockets[channel].push(socket);
        });
    });

    frontServer.listen(
        addresses.CLIENTFRONTPORT, addresses.CLIENTFRONTHOSTNAME, () => {
            console.log(`* Website running at http://${addresses.CLIENTFRONTHOSTNAME}:${addresses.CLIENTFRONTPORT}/`);
        },
    );
};
