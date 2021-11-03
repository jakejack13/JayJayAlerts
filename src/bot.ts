require('dotenv').config();
const tmi = require('tmi.js');
const { HashCounter } = require('hashcounter');
const animations = require('./animations');

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
client.on('chat', 
                async (channel: string, userstate: UserState, message: string, self: boolean) => 
                {await onChatHandler(channel, userstate, message, self)}
          );
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
 * @param channel channel name
 * @param userstate state of the chatting user
 * @param message message sent by user
 * @param self if message was sent by bot
 */
async function onChatHandler (channel: string, userstate: UserState, message: string, self: boolean) {
  if (self) { return; } // Ignore messages from the bot

  const senderName = userstate["display-name"];

  // If chatter new
  if (counter.get(senderName) == 0) {
    console.log(`* New chatter: ${senderName}`);
    client.say(channel, `Hello, ${senderName}`);
    await animations.queueName(senderName);
  } else { // If chatter old
    console.log(`* Old chatter: ${senderName}`);
  }

  counter.add(senderName); // Add user to counter
}

/**
 * Print connection information (address and port)
 * @param addr 
 * @param port 
 */
function onConnectedHandler (addr: string, port: string) {
  console.log(`* Connected to ${addr}:${port}`);
}