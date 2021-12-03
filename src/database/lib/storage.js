//@ts-check

/**
 * A collection of objects used in constructing the database found in the 
 * database node
 * @author Jacob Kerr
 */

/**
 * A class representing an entry into the database
 */
exports.Entry = class {

    /**
     * Creates a new Entry object
     * @param {string[][]} fieldvalues - an array of tuples representing 
     * the field name/value pairs in the entry
     * @public
     */
    constructor(fieldvalues) {
        this.fields = [];
        for (let fieldvalue of fieldvalues) {
            this.fields.push(fieldvalue[0]);
            this[fieldvalue[0]] = fieldvalue[1];
        }
    }

    /**
     * Returns the value of the field
     * @param {string} field - the field to get the value from
     * @returns {string|undefined} the value of the field or undefined if the 
     * field is invalid
     * @public
     */
    getValue(field) {
        if (this.fields.includes(field)) return this[field];
        return undefined;
    }

    /**
     * Sets the value of the field if the field is valid
     * @param {string} field 
     * @param {string} value 
     * @returns {boolean} true if the field is valid, false otherwise
     * @public
     */
    setValue(field, value) {
        if ( this.fields.includes(field)) {
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
     * @param {string} id - the id of the entry
     * @param {string} field - the field to get the value from
     * @returns {string|undefined} the value of the field associated with entry
     * of the corresponding id or undefined if neither exist
     * @public
     */
    getValue(id, field) {
        if(!(this.ids.includes(id))) return undefined;
        /** @type exports.Entry */
        let entry = this[id];
        return entry.getValue(field);
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
        if(!(this.ids.includes(id))) return false;
        /** @type exports.Entry */
        let entry = this[id];
        return entry.setValue(field, value);
    }

    /**
     * Checks if any entry in the database contains the specified value in the
     * specified field
     * @param {string} field - the field to find the value at
     * @param {string} value - the value to find
     * @returns {boolean} true if the value is found at that field, false 
     * otherwise
     */
    isValue(field, value) {
        for (let id of this.ids) {
            /** @type {exports.Entry} */
            let entry = this[id];
            let foundvalue = entry.getValue(field);
            if (foundvalue === value) return true;
        }
        return false;
    }

    /**
     * Adds a new entry to the database
     * @param {string[]} values - the values to add in the entry in order of
     * fields in the database
     * @returns {boolean} true if the entry was successfully added, false otherwise
     * @public
     */
    addEntry(values) {
        if (values.length !== this.fields.length) return false;
        let id = values[0];
        if (this.ids.includes(id)) return false;
        this.ids.push(id);
        /** @type {string[][]} */
        let fieldvalues = [];
        for (let i = 0; i < values.length; i++) {
            fieldvalues.push([this.fields[i], values[i]]);
        }
        this[id] = new exports.Entry(fieldvalues);
        return true;
    }

    /**
     * Returns a list of values from the specified field
     * @param {string} field - the field to pull the values from
     * @returns {string[]|undefined} the values in the field or undefined if 
     * field does not exist
     */
    getField(field) {
        if ((!(this.fields.includes(field)))) return undefined;
        let values = [];
        for (let id of this.ids) {
            values.push(this[id].getValue(field));
        }
        return values;
    }
}
