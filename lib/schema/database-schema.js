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
let FIELDS = process.env.FIELDS.split(',');

/**
 * The request path for a getValue request
 */
let GET = process.env.GET;

/**
 * The request path for a setValue request
 */
let SET = process.env.SET;

/**
 * The request path for an isValue request
 */
let IS = process.env.IS;

/**
 * The request path for an addEntry request
 */
let ADD = process.env.ADD;

/**
 * The request path for a getField request
 */
let FIELD = process.env.FIELD;


/**
 * Creates a getValue request to send to the database node
 * @param {string} channel - the channel to get information from
 * @param {string} field - the field to get information from
 * @returns {string} the full address of the request
 */
exports.getRequest = function(channel, field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${GET}?channel=${channel}&field=${field}`;
}


/**
 * Creates a setValue request to send to the database node
 * @param {string} channel - the channel to set information for
 * @param {string} field - the field to set information for
 * @param {string} value - the value to set the field to 
 * @returns {string} the full address of the request
 */
 exports.setRequest = function(channel, field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${SET}?channel=${channel}&field=${field}&value=${value}`;
}


/**
 * Creates an isValue request to send to the database node
 * @param {string} field - the field to check information from
 * @param {string} value - the value to check match
 * @returns {string} the full address of the request
 */
 exports.isRequest = function(field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${IS}?field=${field}&value=${value}`;
}


/**
 * Creates an addEntry request to send to the database node
 * @param {string[]} values - the values that make up a new entry to the database
 * @returns {string|undefined} the full address of the request
 */
exports.addRequest = function(values) {
    if (values.length != FIELDS.length) return undefined;
    let request = `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${ADD}?`;
    for (let i = 0; i < values.length; i++) {
        request += `${FIELDS[i]}=${values[i]}&`
    }
    return request.slice(0, request.length-1);
}


/**
 * Creates a getField request to send to the database node
 * @param {string} field - the field to get values from
 * @return {string} the full address of the request
 */
exports.fieldRequest = function(field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${FIELD}?field=${field}`;
}
