// @ts-check

// eslint-disable-next-line no-unused-vars
const socketio = require('socket.io');
// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const api = require('@twurple/api');
// eslint-disable-next-line no-unused-vars
const eventsub = require('@twurple/eventsub');

/**
 * Creates a new alerts page for the specified channel and adds Twitch API
 * event listeners
 * @param {string} channel - the channel to create the new page for
 * @param {socketio.Socket} socket - the sockets associated
 * with each channel
 * @param {api.ApiClient} apiClient
 * @param {eventsub.EventSubMiddleware} middleware - the Twitch API EventSub
 * wrapper
 */
exports.resgisterNewAlerts = async function(channel, socket,
    apiClient, middleware) {
    middleware.subscribeToChannelFollowEvents(
        (await apiClient.users.getUserByName(channel)), (event) => {
            const message = 'just followed!';
            socket.emit('alerts - message', message);
        });
};
