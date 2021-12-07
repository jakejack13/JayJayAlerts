//@ts-check

/**
 * The schema used for communication between the bot and client for logging
 *  Twitch events
 * @author Jacob Kerr
 */

const addresses = require('./addresses');


/**
 * The request path for a chat request
 */
exports.CHAT = '/chat'

/**
 * The request path for a follow request
 */
exports.FOLLOW = '/follow';

/**
 * The request path for a subscription request
 */
exports.SUBSCRIPTION = '/sub';


/**
 * Creates a chat request to send to the client node
 * @param {string} channel - the name of the channel chat
 * @param {string} username - the name of the user who chatted
 * @param {string} message - the message that was chatted
 * @returns the full address of the request
 */
 exports.chatRequest = function(channel, username, message) {
    return `http://${addresses.HOSTNAME}:${addresses.CLIENTBACKPORT}${exports.CHAT}?channel=${channel}&username=${username}&message=${message}`;
}

/**
 * Creates a follow request to send to the client node
 * @param {string} channel - the name of the followed channel
 * @param {string} username - the name of the user who followed
 * @returns the full address of the request
 */
exports.followRequest = function(channel, username) {
    return `http://${addresses.HOSTNAME}:${addresses.CLIENTBACKPORT}${exports.FOLLOW}?channel=${channel}&username=${username}`;
}


/**
 * Creates a subscription request to send to the client node
 * @param {string} channel - the name of the subscribed channel
 * @param {string} username - the name of the user who subscribed
 * @returns the full address of the request
 */
exports.subscriptionRequest = function(channel, username) {
    return `http://${addresses.HOSTNAME}:${addresses.CLIENTBACKPORT}${exports.SUBSCRIPTION}?channel=${channel}&username=${username}`;
}
