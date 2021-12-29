const socket = io();

document.getElementById('channelButton').addEventListener(
    'click', submitChannel,
);

socket.on('client connected', () => {
    console.log('Connected');
});

socket.on('data sent', (dataString) => {
    const data = JSON.parse(dataString);
    console.log(data);
});


/**
 * Submits channel to server
 */
// eslint-disable-next-line
function submitChannel() {
    const channel = document.getElementById('channel').value;
    socket.emit('channel sent', channel);
    return false;
};
