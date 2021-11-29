const fs = require('fs');
const path = require('path');

/**
 * The path to the channels.txt file
 */
const CHANNELFILE = path.join(__dirname, "../data/channels.txt");

/**
 * The list of channels to connect to
 */
export var CHANNELS = [];

/**
 * Loads the list of channegls from channels.txt 
 */
export function loadChannels() {
    const data = fs.readFileSync(CHANNELFILE, 'utf8');
    const servers = data.split(' ');
    CHANNELS = [];
    for (let server in servers) {
        CHANNELS.push(server);
    }
}


/**
 * Saves the list of channels to channels.txt
 */
export function saveChannels() {
    let channelString = CHANNELS.join('\n');
    fs.writeFileSync(CHANNELFILE, channelString);
}

setInterval(saveChannels, 60000);