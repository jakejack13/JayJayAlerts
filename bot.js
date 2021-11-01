//@ts-check

require('dotenv').config();
const tmi = require('tmi.js');
const { HashCounter } = require('hashcounter');
const { WindowWrapper } = require('./lib/windowwrapper');

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

const counter = new HashCounter();
const window = new WindowWrapper();

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
 * @param {object} userstate state of the chatting user
 * @param {string} message message sent by user
 * @param {boolean} self if message was sent by bot
 */
function onChatHandler (channel, userstate, message, self) {
  if (self) { return; } // Ignore messages from the bot

  const senderName = userstate["display-name"];

  // If chatter new
  if (counter.get(senderName) == 0) {
    console.log(`* New chatter: ${senderName}`);
    window.display(senderName);
  } else { // If chatter old
    console.log(`* Old chatter: ${senderName}`);
  }

  counter.add(senderName); // Add user to counter
}

/**
 * 
 * @param {*} addr 
 * @param {*} port 
 */
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}