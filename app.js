// @ts-check

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

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
