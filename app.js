// @ts-check

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const userWeb = require('./lib/userWebsite');
const alertsWeb = require('./lib/alertsWebsite');

// Constants
const DEP_HOSTNAME = process.env.DEP_HOSTNAME || 'localhost';
const DEP_PORT = parseInt(process.env.DEP_PORT) || 3000;

// Creating webserver for all tasks
const app = express();
const server = http.createServer(app);
/** @type {socketio.Server} */
// @ts-ignore
const io = socketio(server);

// Setting express server settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use('/views', express.static('views'));

/** @type {Map<string, socketio.Socket[]>} */
const sockets = new Map();


// Setting socket listeners
io.on('connection', function(socket) {
    socket.emit('client connected');

    // User socket connections

    // On connection, send modifiable fields
    socket.on('user - connected', () => {
        userWeb.socketConnected(socket);
    });

    // On channel sent, request data from database
    socket.on('user - channel sent', (channel) => {
        userWeb.socketChannelSent(socket, channel, app);
    });

    socket.on('user - values sent', (dataString) => {
        userWeb.socketValuesSent(dataString);
    });


    // Alerts socket connections

    // On connection, associate socket with channel
    socket.on('alerts - connected', (channel) => {
        alertsWeb.socketConnected(socket, channel, sockets);
    });
});


// Server event listeners
app.get('/', (req, res) => {
    res.render('user/index');
});


server.listen(DEP_PORT, DEP_HOSTNAME, () => {
    console.log(`* Website running at http://${DEP_HOSTNAME}:${DEP_PORT}/`);
});

// function sendAlert(channel, message) {
//     if (!sockets.has(channel)) return;
//     for (const socket of sockets.get(channel)) {
//         socket.emit('message', message);
//     }
// }
