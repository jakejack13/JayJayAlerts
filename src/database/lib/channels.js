const fs = require('fs');
const path = require('path');

/**
 * The path to the channels.txt file
 */
const CHANNELFILE = path.join(__dirname, "../data/channels.txt");

/**
 * The list of channels to connect to
 */
var CHANNELS = [];

/**
 * Loads the database of channels from channels.txt 
 */
exports.loadChannels = function() {
    const data = fs.readFileSync(CHANNELFILE, 'utf8');
    const servers = data.split(' ');
    CHANNELS = [];
    for (let server in servers) {
        CHANNELS.push(server);
    }
}


/**
 * Saves the database of channels to channels.txt
 */
exports.saveChannels = function() {
    let channelString = CHANNELS.join('\n');
    fs.writeFileSync(CHANNELFILE, channelString);
}


/**
 * Adds the channel to the database of channels
 * @param {string} channel - the channel to add
 */
exports.addChannel = function(channel) {
    if (!exports.containsChannel(channel)) {
        CHANNELS.push(channel);
    }
}


/**
 * Removes the channel from the database of channels
 * @param {string} channel - the channel to remove
 */
exports.removeChannel = function(channel) {
    
}


/**
 * Checks if the channel is contained in the database
 * @param {string} channel - the channel to check
 * @returns true if channel is contained in the database, false otherwise
 */
exports.containsChannel = function(channel) {
    return CHANNELS.indexOf() > -1;
}