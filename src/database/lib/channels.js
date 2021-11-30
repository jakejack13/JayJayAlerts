/**
 * channels.js
 * @author Jacob Kerr
 * 
 * This library contains factory functions for SavableContains objects attached
 * to the channels.txt save file
 */

const fs = require('fs');
const path = require('path');

const { SavableContains } = require('../lib/contains');

/**
 * The path to the channels.txt file
 */
const CHANNELFILE = path.join(__dirname, "../data/channels.txt");

/**
 * Creates a new SavableContains object with CHANNELFILE as the specified save
 * file
 * @returns the new SavableContains object
 */
exports.channelContainsFactory = function() {
    return new SavableContains(CHANNELFILE);
}