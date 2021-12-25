//@ts-check

/**
 * The entry point to hosting the bot node
 * @author Jacob Kerr
 */

const tmi = require('tmi.js');
const http = require('http');

const dbschema = require('../../shared/schema/database-schema');
const alschema = require('../../shared/schema/alerts-schema');


/** 
 * The list of channels currently in the database
 * @type {string[]}
 */
var channels = [];

const req = http.request(new URL(dbschema.fieldRequest('channel')), res => {
    res.on('data', d => {
        channels = d.toString().split(',');
    });
});
req.on('error', error => {
    console.error(error)
});
req.end();

/** @type {tmi.Options} */
const opts = {
    identity: {
        username: process.env.SEC_BOTUSERNAME,
        password: process.env.SEC_OAUTHTOKEN
    },
    channels: channels // TODO: Use callbacks to block execution until request of channels is finished
};

const client = new tmi.client(opts);
client.on('connected', onConnectedHandler);
client.on('chat', onChatHandler);
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
 * 
 * @param {string} channel 
 * @param {tmi.ChatUserstate} userstate 
 * @param {string} message 
 * @param {boolean} self 
 */
function onChatHandler(channel, userstate, message, self) {
    if (self) return;

    console.error(message);

    const req = http.request(new URL(alschema.chatRequest(channel, userstate['display-name'], message)), res => {
        res.on('data', data => {
            console.log(data)
        });
    });
    
    req.on('error', error => {
        console.error(error)
    });
}


/**
 * Handles all subscription events detected from registered channels
 * @param {string} channel - the channel that was subscribed to
 * @param {string} username - the name of the user who subscribed
 * @param {tmi.SubMethods} methods
 * @param {string} message - the message associated with the subscription
 * @param {tmi.SubUserstate} userstate - the state of the user subscribing
 */
function onSubscriptionHandler(channel, username, methods, message, userstate) {
    if (!(channels.includes(channel))) return;

    const req = http.request(new URL(alschema.subscriptionRequest(channel, userstate['display-name'])), res => {
        res.on('data', data => {
            console.log(data)
        });
    });
    
    req.on('error', error => {
        console.error(error)
    });
}