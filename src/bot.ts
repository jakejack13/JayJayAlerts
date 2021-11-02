//@ts-check

require('dotenv').config();
const tmi = require('tmi.js');
const { HashCounter } = require('hashcounter');

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

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch
client.connect();

/**
 * An interface for the UserState object coming back from Twitch
 * TODO: Update with new fields as found
 */
interface UserState {
  "display-name": string
}

/**
 * Fires when message sent to chat and detects if new chatter
 * @param {string} channel channel name
 * @param {UserState} userstate state of the chatting user
 * @param {string} message message sent by user
 * @param {boolean} self if message was sent by bot
 */
function onChatHandler (channel: string, userstate: UserState, message: string, self: boolean) {
  if (self) { return; } // Ignore messages from the bot

  const senderName = userstate["display-name"];

  // If chatter new
  if (counter.get(senderName) == 0) {
    console.log(`* New chatter: ${senderName}`);
  } else { // If chatter old
    console.log(`* Old chatter: ${senderName}`);
  }

  counter.add(senderName); // Add user to counter
}

/**
 * Print connection information (address and port)
 * @param {string} addr 
 * @param {string} port 
 */
function onConnectedHandler (addr: string, port: string) {
  console.log(`* Connected to ${addr}:${port}`);
}