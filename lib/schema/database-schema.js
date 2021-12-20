//@ts-check

/**
 * The schema used for data passed between the database and other nodes
 * @author Jacob Kerr
 */

require('dotenv').config({path: './database-schema.env'})

const addresses = require('./addresses');


/**
 * The fields stored in the database
 */
exports.FIELDS = process.env.FIELDS.split(',');

/**
 * The request path for a getValue request
 */
exports.GET = process.env.GET;

/**
 * The request path for a setValue request
 */
exports.SET = process.env.SET;

/**
 * The request path for an isValue request
 */
exports.IS = process.env.IS;

/**
 * The request path for an addEntry request
 */
exports.ADD = process.env.ADD;

/**
 * The request path for a getField request
 */
exports.FIELD = process.env.FIELD;


/**
 * Creates a getValue request to send to the database node
 * @param {string} channel - the channel to get information from
 * @param {string} field - the field to get information from
 * @returns {string} the full address of the request
 */
exports.getRequest = function(channel, field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${exports.GET}?channel=${channel}&field=${field}`;
}


/**
 * Creates a setValue request to send to the database node
 * @param {string} channel - the channel to set information for
 * @param {string} field - the field to set information for
 * @param {string} value - the value to set the field to 
 * @returns {string} the full address of the request
 */
 exports.setRequest = function(channel, field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${exports.SET}?channel=${channel}&field=${field}&value=${value}`;
}


/**
 * Creates an isValue request to send to the database node
 * @param {string} field - the field to check information from
 * @param {string} value - the value to check match
 * @returns {string} the full address of the request
 */
 exports.isRequest = function(field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${exports.IS}?field=${field}&value=${value}`;
}


/**
 * Creates an addEntry request to send to the database node
 * @param {string[]} values - the values that make up a new entry to the database
 * @returns {string|undefined} the full address of the request
 */
exports.addRequest = function(values) {
    if (values.length != exports.FIELDS.length) return undefined;
    let request = `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${exports.ADD}?`;
    for (let i = 0; i < values.length; i++) {
        request += `${exports.FIELDS[i]}=${values[i]}&`
    }
    return request.slice(0, request.length-1);
}


/**
 * Creates a getField request to send to the database node
 * @param {string} field - the field to get values from
 * @return {string} the full address of the request
 */
exports.fieldRequest = function(field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${exports.FIELD}?field=${field}`;
}
