require('dotenv').config();
const tmi = require('tmi.js');
const { queueMessage } = require('../client/lib/animations');

// Define configuration options
const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch
client.connect();


/**
 * Fires when message sent to chat and detects if new chatter
 * @param {string} channel channel name
 * @param {tmi.ChatUserstate} userstate state of the chatting user
 * @param {string} message message sent by user
 * @param {boolean} self if message was sent by bot
 */
function onChatHandler (channel, userstate, message, self) {
    const senderName = userstate["display-name"];  
    if (self || senderName === opts.identity.username) { return; } // Ignore messages from the bot
  
    // switch (message.split(" ")[0]) {
    //   case "!message":
    //     showMessage(channel, userstate, message, self);
    //     break;
    // }
    // newChatter(channel, userstate, message, self);
    // const randInt = getRandomInt(20);
    // if (randInt == 0) {
    //   queueMessage(message);
    // }
    queueMessage(message);
}


/**
 * Print connection information (address and port)
 * @param {string} addr - the connected IP address
 * @param {number} port - the connected port 
 */
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
