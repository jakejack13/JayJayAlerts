//@ts-check

const { loadDatabase } = require('../src/database/lib/database-factory');

var database = loadDatabase();
// console.log(database.getField('channelname'));