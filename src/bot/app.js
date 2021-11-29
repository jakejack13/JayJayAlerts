require('dotenv').config();
const tmi = require('tmi.js');
const channels = require('../database/lib/channels');

channels.loadChannels();

// Configurations
const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: channels.CHANNELS
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);

// Connect to Twitch
client.connect();

/**
 * Print connection information (address and port)
 * @param {string} addr - the connected IP address
 * @param {number} port - the connected port 
 */
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
