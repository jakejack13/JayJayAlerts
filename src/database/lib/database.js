/**
 * database.js
 * The library used to generate new databases for the database node
 * 
 * @author Jacob Kerr
 */

const storage = require('./storage');
const schema = require('../../../lib/schema/database-schema');


 /**
  * Returns a new Database object with the field names as specified by the 
  * database schema
  * @returns new Database object
  */
exports.createDatabase = function () {
    return new storage.Database(schema.FIELDS);
}