//@ts-check

/**
 * The entry point to hosting the bot node
 * @author Jacob Kerr
 */

require('dotenv').config();
const tmi = require('tmi.js');
const http = require('http');

const dbschema = require('../../lib/schema/database-schema');

var channels = [];

const req = http.request(new URL(dbschema.fieldRequest('channel')), res => {
    res.on('data', d => {
        channels = d.split(',');
    });
});

req.on('error', error => {
    console.error(error)
});


/** @type {tmi.Options} */
const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: channels
};

const client = new tmi.client(opts);
client.on('connected', onConnectedHandler);
client.on('subscription', onSubscriptionHandler);
client.connect();

/**
 * Print connection information (address and port)
 * @param {string} addr - the connected IP address
 * @param {number} port - the connected port 
 */
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}


/**
 * Handles all subscription events detected from registered channels
 * @param {string} channel
 * @param {string} username
 * @param {tmi.SubMethods} methods
 * @param {string} message
 * @param {tmi.SubUserstate} userstate
 */
function onSubscriptionHandler(channel, username, methods, message, userstate) {
    if (!(channels.includes(channel))) return;
}