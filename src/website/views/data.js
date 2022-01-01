const socket = io();

/**
 * List of fields in the database
 * @type {string[]}
 */
let fieldList = undefined;

document.getElementById('channelForm').addEventListener(
    'submit', submitChannel, false,
);

document.getElementById('fieldForm').addEventListener(
    'submit', submitFields, false,
);


socket.on('client connected', () => {
    socket.emit('server connected');
});

socket.on('fields sent', (fields) => {
    fieldList = fields.split(',');
    const form = document.getElementById('fieldForm');
    for (const field of fieldList) {
        const label = document.createElement('label');
        label.id = `${field}Label`;
        label.textContent = field;
        const input = document.createElement('input');
        input.id = `${field}Field`;
        label.appendChild(input);
        form.appendChild(label);
    }
});

socket.on('data sent', (dataString) => {
    const data = JSON.parse(dataString);
    for (const field of fieldList) {
        const input = document.getElementById(`${field}Field`);
        input.value = data[field];
    }
});


/**
 * Submits channel to server
 * @param {Event} event - the event that triggered the function call
 * @return {boolean} false
 */
function submitChannel(event) {
    event.preventDefault();
    const channel = document.getElementById('channel').value;
    socket.emit('channel sent', channel);
    return false;
};


/**
 * Submits fields to server
 * @param {Event} event - the event that triggered the function call
 * @return {boolean} false
 */
function submitFields(event) {
    event.preventDefault();
    const data = {};
    for (const field of fieldList) {
        const input = document.getElementById(`${field}Field`);
        data[field] = input.value;
    }
    socket.emit('values sent', JSON.stringify(data));
    return false;
};
