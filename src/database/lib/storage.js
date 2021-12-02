/**
 * storage.js
 * A collection of objects used in constructing the database found in the 
 * database node
 * 
 * @typedef {string[]} Tuple
 * @author Jacob Kerr
 */

/**
 * A class representing an entry into the database
 */
exports.Entry = class {

    /**
     * Creates a new Entry object
     * @param {Tuple[]} fieldvalues - an array of tuples representing 
     * the field name/value pairs in the entry
     * @public
     */
    constructor(fieldvalues) {
        this.fields = [];
        for (let [field, value] in fieldvalues) {
            this.fields.push(field);
            this[field] = value;
        }
    }

    /**
     * Returns the value of the field
     * @param {string} field - the field to get the value from
     * @returns {string|undefined} the value of the field or undefined if the 
     * field is invalid
     * @public
     */
    getField(field) {
        if (field in this.fields) return this[field];
        return undefined;
    }

    /**
     * Sets the value of the field if the field is valid
     * @param {string} field 
     * @param {string} value 
     * @returns {boolean} true if the field is valid, false otherwise
     * @public
     */
    setField(field, value) {
        if (field in this.fields) {
            this[field] = value;
            return true;
        }
        return false;
    }
}

/**
 * A class representing a database
 */
exports.Database = class {

    /**
     * Constructs a new database with the given fields. 
     * Precondition: the first field in the array is the unique id of each 
     * entry
     * @param {string[]} fields the list of fields that can be accessed in 
     * this database
     * @public
     */
    constructor(fields) {
        /**
         * The fields that can be accessed in this database. 
         * Invariant: the first field in the array is the unique id of each
         * entry
         * @type {string[]}
         * @private
         */
        this.fields = fields;

        /**
         * The ids of entries that have been added to the database
         * @type {string[]}
         * @private
         */
        this.ids = [];
    }

    /**
     * Returns the value of a field for the entry of the given id
     * @param {*} id - the id of the entry
     * @param {*} field - the field to get the value from
     * @returns {string|undefined} the value of the field associated with entry
     * of the corresponding id or undefined if neither exist
     * @public
     */
    getValue(id, field) {
        if(!(id in this.ids)) return undefined;
        /** @type exports.Entry */
        let entry = this[id];
        return entry.getField(field);
    }

    /**
     * Sets the value of a field for the entry of the given id
     * @param {string} id - the id of the entry
     * @param {string} field - the field to get the value from
     * @param {string} value - the value to set
     * @returns {boolean} true if the id and field are valid, false otherwise
     * @public
     */
    setValue(id, field, value) {
        if(!(id in this.ids)) return false;
        /** @type exports.Entry */
        let entry = this[id];
        return entry.setField(field);
    }

    /**
     * Adds a new entry to the database
     * @param {string[]} values - the values to add in the entry in order of
     * fields in the database
     * @returns {boolean} true if the entry was successfully added, false otherwise
     * @public
     */
    addEntry(values) {
        if (fieldvalues.length != this.fields.length) return false;
        let id = fieldvalues[0];
        if (id in this.ids) return false;
        /** @type {Tuple[]} */
        let fieldvalues = [];
        for (let i = 0; i < values.length; i++) {
            fieldvalues.push([this.fields[i], values[i]]);
        }
        return true;
    }
}