// @ts-check
/**
 * The entrypoint to JayJayAlerts
 * @author Jacob Kerr
 */

/** */
const http = require('http');
const crypto = require('crypto');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const socketio = require('socket.io');
const {ClientCredentialsAuthProvider} = require('@twurple/auth');
const {ApiClient} = require('@twurple/api');
const {EventSubMiddleware} = require('@twurple/eventsub');

const userWeb = require('./lib/userWebsite');
const alertsWeb = require('./lib/alertsWebsite');

// Constants
const DEP_HOSTNAME = process.env.DEP_HOSTNAME || 'localhost';
const DEP_PORT = parseInt(process.env.DEP_PORT) || 3000;
const SEC_CLIENTID = process.env.SEC_CLIENTID;
const SEC_CLIENTSECRET = process.env.SEC_CLIENTSECRET;


// Creating webserver for all tasks
const app = express();
const server = http.createServer(app);
/** @type {socketio.Server} */
// @ts-ignore
const io = socketio(server);

// Creating Twitch API access
const authProvider = new ClientCredentialsAuthProvider(SEC_CLIENTID,
    SEC_CLIENTSECRET);
const apiClient = new ApiClient({authProvider});
const middleware = new EventSubMiddleware({
    apiClient,
    hostName: DEP_HOSTNAME,
    pathPrefix: '/twitch',
    secret: crypto.randomBytes(32).toString('hex'),
});


// Setting express server settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use('/views', express.static('views'));
app.use(favicon(path.join(__dirname, '/views/favicon.ico')));

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
        userWeb.socketChannelSent(socket, channel, app, middleware,
            apiClient, sockets);
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


(async () => {
    await middleware.apply(app);

    server.listen(DEP_PORT, DEP_HOSTNAME, async () => {
        console.log(`* Website running at http://${DEP_HOSTNAME}:${DEP_PORT}/`);

        await middleware.markAsReady();
    });
})();
