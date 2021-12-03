//@ts-check

const assert = require('assert');

const storage = require('../../src/database/lib/storage');

describe('Entry', function() {
    describe('#constructor()', function() {
        it('adds the correct field names to this.fields', function() {
            let fieldvalues = [['channel','JakeJack'],['isSub','true']];
            let entry = new storage.Entry(fieldvalues);
            assert.ok(entry.fields.includes('channel'));
            assert.ok(entry.fields.includes('isSub'));
        });
    });

    describe('#getValue()', function() {

    });

    describe('#setValue()', function() {

    });
});

describe('Database', function() {
    describe('#getValue()', function() {

    });

    describe('#setValue()', function() {

    });

    describe('#isValue()', function() {

    });

    describe('#addEntry()', function() {

    });
});
