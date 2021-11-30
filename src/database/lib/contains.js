/**
 * contains.js
 * @author Jacob Kerr
 * 
 * This library contains the SavableContains object, which makes up part of the
 * database node
 */


/**
 * A class used to check if certain data is inside of it and savable to a 
 * specified file
 */
exports.SavableContains = class {
    /**
     * Constructs a new SavableContains object that saves to the given file
     * @param {string} filename - the file to save this object to
     */
    constructor(filename) {
        /**
         * The data contained in the object
         */
        this.data = [];
        /**
         * The file to save the data to
         */
        this.filename = filename;
    }


    /**
     * Loads the data from the save file into the object
     */
    load() {
        const dataString = fs.readFileSync(this.data, 'utf8');
        const dataSplit = dataString.split('\n');
        this.data = [];
        for (let d in dataSplit) {
            this.data.push(d);
        }
    }


    /**
     * Saves the data from the object into the save file
     */
    save() {
        let dataString = this.data.join('\n');
        fs.writeFileSync(this.filename, dataString);
    }


    /**
     * Inserts the element into the object
     * @param {*} elm - the element to be inserted 
     */
    add(elm) {
        if (!this.contains(elm)) {
            this.data.push(elm);
        }
    }

    
    /**
     * Removes the element from the object
     * @param {*} elm - the element to be removed
     */
    remove(elm) {
        if (this.contains(elm)) {
            this.data.splice(this.data.indexOf(elm), 1);
        }
    }


    /**
     * Checks if the element is contained in the object
     * @param {*} elm - the element to check
     * @returns true if element is contained, false otherwise
     */
    contains(elm) {
        return this.data.includes(elm);
    }
}