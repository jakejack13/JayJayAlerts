const assert = require('assert');

const { SavableContains } = require('../../src/database/lib/contains');

const DUMMYFILE = '.';

describe('SavableContains', function() {
    describe('.add()', function() {
        it('should add an element if it is not already added', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.add(1);
            assert.ok(contains.data.includes(1));
            assert.equal(contains.data.length, 1);
        });
        it('should not add an element if it is already added', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.data.push(1);
            contains.add(1);
            assert.ok(contains.data.includes(1));
            assert.equal(contains.data.length, 1);
        });
    });

    describe('.remove()', function() {
        it('should remove an element if it is added', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.data.push(1);
            contains.data.push(2);
            contains.remove(1);
            assert.ok(!contains.data.includes(1));
            assert.equal(contains.data.length, 1);
        });
        it('should not change the data if the element is not added', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.data.push(1);
            contains.data.push(2);
            contains.remove(3);
            assert.ok(contains.data.includes(1));
            assert.equal(contains.data.length, 2);
        });
    });

    describe('.contains()', function() {
        it('should return true if an element is contained', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.data.push(1);
            contains.data.push(2);
            assert.ok(contains.contains(1));
            assert.equal(contains.contains(1), contains.data.includes(1));
        });
        it('should return false if an element is not contained', function() {
            let contains = new SavableContains(DUMMYFILE);
            contains.data.push(1);
            contains.data.push(2);
            assert.ok(!contains.contains(3));
            assert.equal(contains.contains(3), contains.data.includes(3));
        });
    });
});