//@ts-check

/**
 * The library used to generate new databases for the database node
 * @author Jacob Kerr
 */

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { Database } = require('./storage');
const schema = require('../../../lib/schema/database-schema');


/** 
 * @todo Determine permanent place for database file
 * - Docker volume?
 * - Separate Docker image?
*/
const DBFILE = path.join(__dirname, '../data/storage.db');


 /**
  * Returns a new Database object with the field names as specified by the 
  * database schema
  * @returns {Database} new Database object
  */
let databaseFactory = function () {
    return new Database(schema.FIELDS);
}


/**
 * Loads the database from the database file
 * @returns {Database} loaded Database object
 */
exports.loadDatabase = function () {
    let database = databaseFactory();
    let readStream = fs.createReadStream(DBFILE);
    let lines = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    let process = async function() {
        for await (let line of lines) {
            let split = line.split(',');
            database.addEntry(split);
        }
    };
    process();

    return database;
}