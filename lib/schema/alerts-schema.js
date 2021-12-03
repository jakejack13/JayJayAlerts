//@ts-check

/**
 * The schema used for communication between the bot and client for logging
 *  Twitch events
 * @author Jacob Kerr
 */

const addresses = require('./addresses');


/**
 * The request path for a follow request
 */
exports.FOLLOW = '/follow';

/**
 * The request path for a subscription request
 */
exports.SUBSCRIPTION = '/sub';


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
