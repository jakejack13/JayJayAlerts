// @ts-check
// eslint-disable-next-line no-unused-vars
const socketio = require('socket.io');
// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const api = require('@twurple/api');
// eslint-disable-next-line no-unused-vars
const eventsub = require('@twurple/eventsub');

const {resgisterNewAlerts} = require('./shared');

/**
 * On socket connection with server, send modifiable fields to client
 * // TODO: Edit with database request
 * @param {socketio.Socket} socket - the socket that sent the event
 */
exports.socketConnected = function(socket) {
    socket.emit('user - fields sent', 'followMessage');
};


/**
 * On channel sent, request data from database and send to client
 * // TODO: Edit with database request
 * @param {socketio.Socket} socket - that socket that sent the event
 * @param {string} channel - the channel sent by the socket
 * @param {express.Express} app - the express app serving requests
 * @param {eventsub.EventSubMiddleware} middleware - the Twitch API EventSub
 * wrapper
 * @param {api.ApiClient} apiClient - the Twitch API wrapper
 * @param {Map<string, socketio.Socket[]>} sockets - the sockets associated
 * with each channel
 */
exports.socketChannelSent = function(socket, channel, app,
    middleware, apiClient, sockets) {
    app.get(`/alerts/${channel}`, (req, res) => {
        res.render('alerts/index', {channel: channel});
    });
    socket.emit('user - data sent',
        JSON.stringify({followMessage: 'just followed!'}));

    if (!sockets.has(channel)) return;
    for (const socket of sockets.get(channel)) {
        resgisterNewAlerts(channel, socket, apiClient, middleware);
    }
};


/**
 * On values sent, modify database
 * // TODO: Edit with database request
 * @param {string} dataString - the string of data/value pairs sent by the
 * socket
 */
exports.socketValuesSent = function(dataString) {
    const data = JSON.parse(dataString);
    console.error(data);
};
