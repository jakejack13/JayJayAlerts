// @ts-check

/**
 * The schema used for data passed between the database and other nodes
 * @author Jacob Kerr
 */

const addresses = require('./addresses');


/**
 * The fields stored in the database
 */
const FIELDS = process.env.DB_FIELDS.split(',');

/**
 * The request path for a getValue request
 */
const GET = process.env.DB_GET;

/**
 * The request path for a setValue request
 */
const SET = process.env.DB_SET;

/**
 * The request path for an isValue request
 */
const IS = process.env.DB_IS;

/**
 * The request path for an addEntry request
 */
const ADD = process.env.DB_ADD;

/**
 * The request path for a getField request
 */
const FIELD = process.env.DB_FIELD;


/**
 * Creates a getValue request to send to the database node
 * @param {string} channel - the channel to get information from
 * @param {string} field - the field to get information from
 * @return {string} the full address of the request
 */
exports.getRequest = function(channel, field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${GET}?channel=${channel}&field=${field}`;
};


/**
 * Creates a setValue request to send to the database node
 * @param {string} channel - the channel to set information for
 * @param {string} field - the field to set information for
 * @param {string} value - the value to set the field to
 * @return {string} the full address of the request
 */
exports.setRequest = function(channel, field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${SET}?channel=${channel}&field=${field}&value=${value}`;
};


/**
 * Creates an isValue request to send to the database node
 * @param {string} field - the field to check information from
 * @param {string} value - the value to check match
 * @return {string} the full address of the request
 */
exports.isRequest = function(field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${IS}?field=${field}&value=${value}`;
};


/**
 * Creates an addEntry request to send to the database node
 * @param {string[]} values - the values that make up a new entry to the
 * database
 * @return {string|undefined} the full address of the request
 */
exports.addRequest = function(values) {
    if (values.length != FIELDS.length) return undefined;
    let request = `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${ADD}?`;
    for (let i = 0; i < values.length; i++) {
        request += `${FIELDS[i]}=${values[i]}&`;
    }
    return request.slice(0, request.length-1);
};


/**
 * Creates a getField request to send to the database node
 * @param {string} field - the field to get values from
 * @return {string} the full address of the request
 */
exports.fieldRequest = function(field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${FIELD}?field=${field}`;
};
