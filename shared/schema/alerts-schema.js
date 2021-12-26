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
exports.MESSAGE = process.env.AL_MESSAGE;


/**
 * Creates a message request to send to the client node
 * @param {string} channel - the name of the channel associated with the alert
 * @param {string} message - the message to display on alerts
 * @returns the full address of the request
 */
exports.messageRequest = function(channel, message) {
    return `http://${addresses.CLIENTBACKHOSTNAME}:${addresses.CLIENTBACKPORT}${exports.MESSAGE}?channel=${channel}&message=${message}`;
}
