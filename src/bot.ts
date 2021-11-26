require('dotenv').config();
const tmi = require('tmi.js');
const { HashCounter } = require('hashcounter');
const { displayMessages, queueMessage } = require('./animations');

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

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Fires when message sent to chat and detects if new chatter
 * @param channel channel name
 * @param userstate state of the chatting user
 * @param message message sent by user
 * @param self if message was sent by bot
 */
function onChatHandler (channel: string, userstate: UserState, message: string, self: boolean) {
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
 * @param addr 
 * @param port 
 */
function onConnectedHandler (addr: string, port: string) {
  console.log(`* Connected to ${addr}:${port}`);
}

function newChatter (channel: string, userstate: UserState, message: string, self: boolean) {
  const senderName = userstate["display-name"]; 
  // If chatter new
  if (counter.get(senderName) == 0) {
    client.say(channel, `Hello, ${senderName}`);
    queueMessage(senderName);
  }

  counter.add(senderName); // Add user to counter
}

function showMessage (channel: string, userstate: UserState, message: string, self: boolean) {
  const userMessage = message.split(" ").slice(1).join(" ");
  queueMessage(userMessage);
}