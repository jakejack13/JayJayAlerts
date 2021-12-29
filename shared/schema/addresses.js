// @ts-check

/**
 * The list of hostnames and ports where each node is run and accessed
 * @author Jacob Kerr
 */


/**
 * The hostname for the database node
 */
exports.DATABASEHOSTNAME = process.env.ADD_DATABASEHOSTNAME;


/**
 * The hostname for the bot node
 */
exports.BOTHOSTNAME = process.env.ADD_BOTHOSTNAME;


/**
 * The hostname for the forward facing client node
 */
exports.CLIENTFRONTHOSTNAME = process.env.ADD_CLIENTFRONTHOSTNAME;


/**
 * The hostname for the backwards facing client node
 */
exports.CLIENTBACKHOSTNAME = process.env.ADD_CLIENTBACKHOSTNAME;


/**
 * The hostname for the website node
 */
exports.WEBSITEHOSTNAME = process.env.ADD_WEBSITEHOSTNAME;


/**
 * The port for the database node
 */
exports.DATABASEPORT = parseInt(process.env.ADD_DATABASEPORT);


/**
 * The port for the bot node
 */
exports.BOTPORT = parseInt(process.env.ADD_BOTPORT);


/**
 * The port for the client node backend
 */
exports.CLIENTBACKPORT = parseInt(process.env.ADD_CLIENTBACKPORT);


/**
 * The port for the client node frontend
 */
exports.CLIENTFRONTPORT = parseInt(process.env.ADD_CLIENTFRONTPORT);


/**
 * The port for the website node
 */
exports.WEBSITEPORT = parseInt(process.env.ADD_WEBSITEPORT);
