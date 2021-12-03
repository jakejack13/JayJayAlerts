//@ts-check

const storage = require('../src/database/lib/storage');

var database = new storage.Database(['name','age']);
console.log(database.addEntry(['JakeJack','35']));
console.log(database.isValue('name','JakeJack'));
