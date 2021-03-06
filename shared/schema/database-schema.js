// @ts-check

/**
 * The schema used for data passed between the database and other nodes
 * @author Jacob Kerr
 */

const addresses = require('./addresses');


/**
 * The fields stored in the database
 */
exports.FIELDS = process.env.DB_FIELDS.split(',');

/**
 * The request path for a GET request
 */
const GET = process.env.DB_GET;

/**
 * The request path for a SET request
 */
const SET = process.env.DB_SET;

/**
 * The request path for an IS request
 */
const IS = process.env.DB_IS;

/**
 * The request path for an ADD request
 */
const ADD = process.env.DB_ADD;

/**
 * The request path for a FIELD request
 */
const FIELD = process.env.DB_FIELD;

/**
 * The request path for an ENTRY request
 */
const ENTRY = process.env.DB_ENTRY;


/**
 * Creates a GET request to send to the database node
 * @param {string} channel - the channel to get information from
 * @param {string} field - the field to get information from
 * @return {string} the full address of the request
 */
exports.getRequest = function(channel, field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${GET}?channel=${channel}&field=${field}`;
};


/**
 * Creates a SET request to send to the database node
 * @param {string} channel - the channel to set information for
 * @param {string} field - the field to set information for
 * @param {string} value - the value to set the field to
 * @return {string} the full address of the request
 */
exports.setRequest = function(channel, field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${SET}?channel=${channel}&field=${field}&value=${value}`;
};


/**
 * Creates an IS request to send to the database node
 * @param {string} field - the field to check information from
 * @param {string} value - the value to check match
 * @return {string} the full address of the request
 */
exports.isRequest = function(field, value) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${IS}?field=${field}&value=${value}`;
};


/**
 * Creates an ADD request to send to the database node
 * @param {string[]} values - the values that make up a new entry to the
 * database
 * @return {string|undefined} the full address of the request
 */
exports.addRequest = function(values) {
    if (values.length != exports.FIELDS.length) return undefined;
    let request = `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${ADD}?`;
    for (let i = 0; i < values.length; i++) {
        request += `${exports.FIELDS[i]}=${values[i]}&`;
    }
    return request.slice(0, request.length-1);
};


/**
 * Creates a FIELD request to send to the database node
 * @param {string} field - the field to get values from
 * @return {string} the full address of the request
 */
exports.fieldRequest = function(field) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${FIELD}?field=${field}`;
};


/**
 * Creates an ENTRY request to send to the database node
 * @param {string} channel - the chanel to get the entry from
 * @return {string} the full address of the request
 */
exports.entryRequest = function(channel) {
    return `http://${addresses.DATABASEHOSTNAME}:${addresses.DATABASEPORT}${ENTRY}?channel=${channel}`;
};
