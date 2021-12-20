//@ts-check

/**
 * The list of hostnames and ports where each node is run and accessed
 * @author Jacob Kerr
 */

require('dotenv').config({path: './addresses.env'});

/**
 * The hostname for the database node
 */
exports.DATABASEHOSTNAME = process.env.DATABASEHOSTNAME;


/**
 * The hostname for the bot node
 */
exports.BOTHOSTNAME = process.env.BOTHOSTNAME;


/**
 * The hostname for the forward facing client
 */
exports.CLIENTFRONTHOSTNAME = process.env.CLIENTFRONTHOSTNAME;


/**
 * The hostname for the backwards facing client
 */
exports.CLIENTBACKHOSTNAME = process.env.CLIENTBACKHOSTNAME;


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