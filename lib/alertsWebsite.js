// @ts-check
/**
 * A library of functions used for managing the user side of the website
 * @module lib/alertsWebsite
 * @author Jacob Kerr
 */

// eslint-disable-next-line no-unused-vars
const socketio = require('socket.io');
// eslint-disable-next-line no-unused-vars
const api = require('@twurple/api');
// eslint-disable-next-line no-unused-vars
const eventsub = require('@twurple/eventsub');


/**
 * On socket connection with server, associate socket with channel
 * @param {socketio.Socket} socket - the socket that sent the event
 * @param {string} channel - the channel sent by the socket
 * @param {Map<string, socketio.Socket[]>} sockets - the sockets associated
 * with each channel
 */
exports.socketConnected = function(socket, channel, sockets) {
    /** @type {socketio.Socket[]} */
    let socketList;
    if (sockets.has(channel)) {
        socketList = sockets.get(channel);
    } else {
        socketList = [];
    }
    socketList.push(socket);
};


/**
 * Creates a new alerts page for the specified channel and adds Twitch API
 * event listeners
 * @param {string} channel - the channel to create the new page for
 * @param {socketio.Socket} socket - the socket associated
 * with the channel
 * @param {api.ApiClient} apiClient
 * @param {eventsub.EventSubMiddleware} middleware - the Twitch API EventSub
 * wrapper
 */
exports.resgisterNewAlerts = async function(channel, socket,
    apiClient, middleware) {
    middleware.subscribeToChannelFollowEvents(
        (await apiClient.users.getUserByName(channel)).id, (event) => {
            const message = 'just followed!';
            socket.emit('alerts - message', message);
        });
};
