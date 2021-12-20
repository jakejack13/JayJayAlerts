//@ts-check

/**
 * The list of hostnames and ports where each node is run and accessed
 * @author Jacob Kerr
 */

const path = require('path');

require('dotenv').config({path: path.join(__dirname, './addresses.env')});

/**
 * The hostname for the database node
 */
exports.DATABASEHOSTNAME = process.env.DATABASEHOSTNAME;


/**
 * The hostname for the bot node
 */
exports.BOTHOSTNAME = process.env.BOTHOSTNAME;


/**
 * The hostname for the forward facing client node
 */
exports.CLIENTFRONTHOSTNAME = process.env.CLIENTFRONTHOSTNAME;


/**
 * The hostname for the backwards facing client node
 */
exports.CLIENTBACKHOSTNAME = process.env.CLIENTBACKHOSTNAME;


/**
 * The hostname for the website node
 */
exports.WEBSITEHOSTNAME = process.env.WEBSITEHOSTNAME;


/**
 * The port for the database node
 */
exports.DATABASEPORT = parseInt(process.env.DATABASEPORT);


/**
 * The port for the bot node
 */
exports.BOTPORT = parseInt(process.env.BOTPORT);


/**
 * The port for the client node backend
 */
exports.CLIENTBACKPORT = parseInt(process.env.CLIENTBACKPORT);


/**
 * The port for the client node frontend
 */
exports.CLIENTFRONTPORT = parseInt(process.env.CLIENTFRONTPORT);


/**
 * The port for the website node
 */
exports.WEBSITEPORT = parseInt(process.env.WEBSITEPORT);